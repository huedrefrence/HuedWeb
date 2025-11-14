import fs from 'fs';
import path from 'path';

const UA = 'Mozilla/5.0 (compatible; HuedMetadataBot/1.0; +https://example.com)';
const CACHE_PATH = path.join(process.cwd(), 'app', 'csvfashiondata', 'meta-cache.json');
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const FETCH_TIMEOUT_MS = 8000;

type CacheEntry = { text: string; fetchedAt: number };
type Cache = Record<string, CacheEntry>;

let memCache: Cache | null = null;
let rateHits: number[] = [];
const RATE_LIMIT = 15; // 15 requests per minute per server instance
const RATE_WINDOW_MS = 60_000;

function loadCache(): Cache {
  if (memCache) return memCache;
  try {
    const txt = fs.readFileSync(CACHE_PATH, 'utf8');
    memCache = JSON.parse(txt);
  } catch {
    memCache = {};
  }
  return memCache!;
}

function saveCache() {
  try {
    if (!memCache) return;
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(memCache), 'utf8');
  } catch {
    // ignore write failures
  }
}

function now() { return Date.now(); }

export function isHttpUrl(u?: string): boolean {
  if (!u) return false;
  try {
    const url = new URL(u);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch { return false; }
}

function isPrivateHostname(host: string): boolean {
  // Basic SSRF guard: block obvious private hosts and IP-literals
  const h = host.toLowerCase();
  if (/^(localhost|127\.|0\.0\.0\.0)/.test(h)) return true;
  if (/^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/.test(h)) return true;
  if (/^(\d+\.){3}\d+$/.test(h)) return true; // any IPv4 literal
  return false;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('fetch timeout')), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

export function sanitizeText(s?: string): string {
  if (!s) return '';
  let x = String(s);
  // strip tags
  x = x.replace(/<script[\s\S]*?<\/script>/gi, '');
  x = x.replace(/<style[\s\S]*?<\/style>/gi, '');
  x = x.replace(/<[^>]+>/g, '');
  // strip urls and hashtags
  x = x.replace(/https?:\/\/[\w./?&%#=:+-]+/gi, '');
  x = x.replace(/#[\p{L}0-9_\-]+/giu, '');
  // normalize whitespace
  x = x.replace(/[\s\u00A0]+/g, ' ').trim();
  // clamp length
  if (x.length > 300) x = x.slice(0, 297) + '...';
  return x;
}

function extractTitleFromHtml(html: string): string | undefined {
  const tryMeta = (name: string, attr: 'name'|'property' = 'name') => {
    const re = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
    const m = html.match(re);
    return m?.[1];
  };
  const og = tryMeta('og:title', 'property');
  if (og) return og;
  const tw = tryMeta('twitter:title');
  if (tw) return tw;
  const mt = tryMeta('title');
  if (mt) return mt;
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (titleTag) return titleTag;
  const ld = extractFromLdJson(html);
  if (ld) return ld;
}

export async function getMetaTitle(urlStr: string): Promise<string> {
  if (!isHttpUrl(urlStr)) return '';
  try {
    const u = new URL(urlStr);
    if (isPrivateHostname(u.hostname)) return '';
    const res = await withTimeout(fetch(urlStr, { headers: { 'user-agent': UA } }), FETCH_TIMEOUT_MS);
    if (!res.ok) return '';
    const html = await res.text();
    const raw = extractTitleFromHtml(html) || '';
    const txt = sanitizeText(raw);
    return txt;
  } catch {
    return '';
  }
}

function extractFromLdJson(html: string): string | undefined {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of scripts) {
    try {
      const data = JSON.parse(m[1]);
      const candidates = Array.isArray(data) ? data : [data];
      for (const c of candidates) {
        if (c && typeof c === 'object') {
          if (c.description) return String(c.description);
          if (c.headline) return String(c.headline);
        }
      }
    } catch {}
  }
}

function extractMeta(html: string, name: string, attr: 'name'|'property' = 'name'): string | undefined {
  const re = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
  const m = html.match(re);
  return m?.[1];
}

function firstParagraph(html: string): string | undefined {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return m ? m[1] : undefined;
}

export async function getMetaDescription(urlStr: string): Promise<string> {
  if (!isHttpUrl(urlStr)) return '';
  try {
    const u = new URL(urlStr);
    if (isPrivateHostname(u.hostname)) return '';

    // rate limit
    const nowTs = now();
    rateHits = rateHits.filter((t) => nowTs - t < RATE_WINDOW_MS);
    if (rateHits.length >= RATE_LIMIT) return '';
    rateHits.push(nowTs);

    // cache
    const cache = loadCache();
    const entry = cache[urlStr];
    if (entry && nowTs - entry.fetchedAt < CACHE_TTL_MS) return entry.text;

    const res = await withTimeout(fetch(urlStr, { headers: { 'user-agent': UA } }), FETCH_TIMEOUT_MS);
    if (!res.ok) return '';
    const html = await res.text();
    // extraction priority
    const raw = extractMeta(html, 'og:description', 'property')
      || extractMeta(html, 'twitter:description')
      || extractMeta(html, 'description')
      || extractFromLdJson(html)
      || firstParagraph(html)
      || '';
    const text = sanitizeText(raw);
    cache[urlStr] = { text, fetchedAt: nowTs };
    saveCache();
    return text;
  } catch {
    return '';
  }
}
