/* Next.js App Router API to query SQLite for Knowledge Hub */
import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getMetaDescription, getMetaTitle, sanitizeText } from '@/lib/meta';
import crypto from 'crypto';

export const runtime = 'nodejs';

type DB = any;

async function importSqlite(): Promise<any> {
  try {
    const mod: any = await import('better-sqlite3');
    return mod.default ?? mod;
  } catch (e) {
    throw new Error('Missing dependency better-sqlite3. Install with: npm i better-sqlite3');
  }
}

function readFileText(rel: string): string {
  const filePath = path.join(process.cwd(), rel);
  return fs.readFileSync(filePath, 'utf8');
}

async function openDb(dbFile: string): Promise<any | null> {
  try {
    const Database = await importSqlite();
    const db = new Database(dbFile);
    db.pragma('foreign_keys = ON');
    return db;
  } catch (e) {
    return null; // allow graceful fallback to GitHub JSON
  }
}

function toJsonArrayParam(v: string | null): string {
  if (!v) return '[]';
  const arr = v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    return JSON.stringify(arr);
  } catch {
    return '[]';
  }
}

function mapRowToRawItem(row: any) {
  return {
    id: String(row.external_id ?? row.id),
    type: row.type,
    title: row.title,
    creator: row.creator,
    creator_title: row.creator_title,
    date: row.date_published,
    tags: (row.tags_csv ? String(row.tags_csv).split(',') : []).filter(Boolean),
    thumbnail_url: row.cover_url,
    duration: row.duration_text ?? undefined,
    excerpt: row.excerpt ?? '',
    url: row.url ?? undefined,
    platform: row.platform ?? undefined,
  };
}

async function fetchGithubJson(url?: string): Promise<any[] | null> {
  if (!url) return null;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`GitHub JSON fetch failed: ${r.status}`);
  const arr = await r.json();
  if (!Array.isArray(arr)) return [];
  return arr as any[];
}

function parseCsv(text: string): any[] {
  // Minimal CSV parser supporting quotes and commas; returns array of row objects using header row keys
  const rows: string[] = text.replace(/\r\n?/g, '\n').split('\n').filter(Boolean);
  if (rows.length === 0) return [];
  const parseLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; } else { q = false; }
        } else { cur += ch; }
      } else {
        if (ch === '"') q = true;
        else if (ch === ',') { out.push(cur); cur = ''; }
        else cur += ch;
      }
    }
    out.push(cur);
    return out;
  };
  const header = parseLine(rows[0]).map((h) => h.trim());
  return rows.slice(1).map((line) => {
    const cols = parseLine(line);
    const obj: any = {};
    header.forEach((h, i) => { obj[h] = cols[i]; });
    return obj;
  });
}

async function fetchGithubCsv(url?: string): Promise<any[] | null> {
  if (!url) return null;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`GitHub CSV fetch failed: ${r.status}`);
  const text = await r.text();
  return parseCsv(text);
}

function readLocalCsv(relPath?: string): any[] | null {
  if (!relPath) return null;
  const filePath = path.isAbsolute(relPath) ? relPath : path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return null;
  const text = fs.readFileSync(filePath, 'utf8');
  return parseCsv(text);
}

function mapCsvRowToRaw(item: any) {
  // Flexible mapping from the CSV fields the user shared
  const url = item.URL || item.Url || item.link || '';
  const source = (item.Source || item.Platform || '').toLowerCase();
  const creatorFromUrl = parseCreatorFromUrl(url) || '';
  const titleRaw = item.Title || item.title || item.Headline || '';
  const contentType = item.Content_Type || item.Type || item.type || '';
  const category = item.Category || item.category;
  const thumbnail = item.Thumbnail_URL || item.thumbnail_url || item.Image || item.image;
  const creator = item.Creator || item.Author || item.author || creatorFromUrl;
  const date = item.Date || item.date || '';
  const duration = normalizeDuration(item.Duration || item.duration || item.Time_Spent_Minutes);
  const tags = [category, item.Difficulty_Level, item.Level].filter(Boolean).join(',');
  // Only show a real description if provided; and strip raw URLs
  const excerpt = sanitizeText(item.Description || item.Excerpt || '');
  const baseId = item.id || item.ID || stableId(url, category);
  const base: any = {
    id: baseId,
    type: contentType,
    // Important: do NOT fallback to category here. Leave title empty if not provided
    // so enrichment can try to fetch a real meta title first.
    title: (() => {
      const clean = sanitizeText(titleRaw);
      return clean && !isProbablyUrl(clean) ? clean : '';
    })(),
    creator,
    timestamp: date,
    date,
    tags,
    thumbnail_url: thumbnail,
    duration,
    excerpt,
    url,
    platform: source,
    category,
    Category: category,
  };
  return base;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('q');
    const types = toJsonArrayParam(searchParams.get('types')); // comma-separated
    const creators = toJsonArrayParam(searchParams.get('creators'));
    const tag = searchParams.get('tag');
    const date = searchParams.get('date') || 'Anytime';
    const sort = searchParams.get('sort') === 'date' ? 'date' : 'relevance';
    const init = searchParams.get('init') === '1';
    const source = searchParams.get('source') || undefined; // 'gh' | 'csv' | undefined
    const ghJsonUrl = process.env.KH_GITHUB_JSON_URL || undefined;
    const ghCsvUrl = process.env.KH_GITHUB_CSV_URL || undefined;
    const wantStats = searchParams.get('stats') === '1';
    const enrich = searchParams.get('enrich') === '1';
    const useLocal = searchParams.get('local') === '1';
    const localCsv = process.env.KH_LOCAL_CSV_PATH || 'app/csvfashiondata/enhanced_fashion_data.csv';

    // GitHub JSON proxy (optional)
    if (source === 'gh' && ghJsonUrl) {
      const arr = await fetchGithubJson(ghJsonUrl);
      return new Response(JSON.stringify(arr ?? []), { headers: { 'content-type': 'application/json' } });
    }
    if (source === 'csv' && (ghCsvUrl || useLocal)) {
      const rows = useLocal ? readLocalCsv(localCsv) : await fetchGithubCsv(ghCsvUrl);
      const mapped = applyLocalOverrides((rows ?? []).map(mapCsvRowToRaw));
      if (enrich) await enrichDescriptions(mapped);
      if (wantStats) {
        const stats = summarizeVideoStats(mapped);
        return new Response(JSON.stringify(stats), { headers: { 'content-type': 'application/json' } });
      }
      return new Response(JSON.stringify(mapped), { headers: { 'content-type': 'application/json' } });
    }

    const dbPath = process.env.KH_SQLITE_PATH || path.join(process.cwd(), 'db', 'sqlite', 'kh.db');
    const db = await openDb(dbPath);

    if (db) {
      // initialize if needed (check before open may race with creation; we handle post-open here)
      const needInit = init || !fs.existsSync(dbPath) || !db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='content'").get();
      if (needInit) {
        const schemaSql = readFileText(path.join('db', 'sqlite', 'schema.sql'));
        db.exec(schemaSql);
        const seedSql = readFileText(path.join('db', 'sqlite', 'seed.sql'));
        db.exec(seedSql);
      }

      const querySql = readFileText(path.join('db', 'sqlite', 'queries.sql'));
      const stmt = db.prepare(querySql);
      const rows = stmt.all({
        q: q ?? '',
        types,
        creators,
        tag: tag ?? '',
        date,
        sort,
      });
      const data = rows.map(mapRowToRawItem);
      return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
    }

    // DB not available: fallback to GitHub JSON if configured
    if (localCsv && fs.existsSync(path.join(process.cwd(), localCsv))) {
      const rows = readLocalCsv(localCsv);
      const mapped = applyLocalOverrides((rows ?? []).map(mapCsvRowToRaw));
      if (enrich) await enrichDescriptions(mapped);
      if (wantStats) {
        const stats = summarizeVideoStats(mapped);
        return new Response(JSON.stringify(stats), { headers: { 'content-type': 'application/json' } });
      }
      return new Response(JSON.stringify(mapped), { headers: { 'content-type': 'application/json' } });
    }
    if (ghCsvUrl) {
      const rows = await fetchGithubCsv(ghCsvUrl);
      const mapped = applyLocalOverrides((rows ?? []).map(mapCsvRowToRaw));
      if (enrich) await enrichDescriptions(mapped);
      if (wantStats) {
        const stats = summarizeVideoStats(mapped);
        return new Response(JSON.stringify(stats), { headers: { 'content-type': 'application/json' } });
      }
      return new Response(JSON.stringify(mapped), { headers: { 'content-type': 'application/json' } });
    }
    if (ghJsonUrl) {
      const arr = await fetchGithubJson(ghJsonUrl);
      return new Response(JSON.stringify(arr ?? []), { headers: { 'content-type': 'application/json' } });
    }

    throw new Error('SQLite unavailable and KH_GITHUB_JSON_URL not set');
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: String(err?.message || err || 'Unknown error') }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}

function summarizeVideoStats(rows: any[]) {
  const byCat: Record<string, { count: number; titles: string[] }> = {};
  for (const r of rows) {
    const type = String(r.type || '').toLowerCase();
    if (!type.startsWith('vid')) continue;
    const cat = String((r as any).category || (r as any).Category || 'Uncategorized');
    const key = cat.trim() || 'Uncategorized';
    if (!byCat[key]) byCat[key] = { count: 0, titles: [] };
    byCat[key].count++;
    byCat[key].titles.push(r.title || r.url || String(r.id));
  }
  return byCat;
}

function applyLocalOverrides(rows: any[]): any[] {
  try {
    const overridesPath = path.join(process.cwd(), 'app', 'csvfashiondata', 'overrides.json');
    if (!fs.existsSync(overridesPath)) return rows;
    const raw = JSON.parse(fs.readFileSync(overridesPath, 'utf8')) as Array<any>;
    if (!Array.isArray(raw)) return rows;
    const byKey = new Map<string, any>();
    for (const o of raw) {
      const key = String(o.id || o.url || '').trim();
      if (key) byKey.set(key, o);
    }
    return rows.map((r) => {
      const key = String(r.id || r.url || '').trim();
      const o = byKey.get(key);
      if (!o) return r;
      return {
        ...r,
        title: o.title ?? r.title,
        excerpt: o.description ?? o.excerpt ?? r.excerpt,
        creator: o.creator ?? r.creator,
        creator_title: o.creator_title ?? r.creator_title,
        thumbnail_url: o.thumbnail_url ?? r.thumbnail_url,
        duration: o.duration ?? r.duration,
      };
    });
  } catch {
    return rows;
  }
}

async function enrichDescriptions(rows: any[]) {
  for (const r of rows) {
    // Title enrichment only when no title provided
    const hasTitle = !!(r.title && String(r.title).trim());
    if (!hasTitle && r.url) {
      try {
        const metaTitle = await getMetaTitle(r.url);
        if (metaTitle) r.title = metaTitle;
      } catch {}
    }
    // Final title fallback to category or platform if still empty
    if (!r.title || !String(r.title).trim()) {
      const catName = ((r as any).category || (r as any).Category || '').toString().trim();
      r.title = catName || platformLabel((r as any).platform);
    }

    // Description enrichment
    if (r.excerpt && r.excerpt.trim()) continue;
    if (!r.url) continue;
    try {
      const desc = await getMetaDescription(r.url);
      r.excerpt = sanitizeText(desc);
    } catch {}
    if (!r.excerpt || !r.excerpt.trim()) {
      r.excerpt = buildFallbackDescription({
        category: (r as any).category || (r as any).Category,
        source: (r as any).platform || (r as any).Source,
        creator: r.creator,
      });
    }
  }
}

function buildFallbackDescription({ category, source, creator }: { category?: string; source?: string; creator?: string }) {
  const cat = (category && String(category).trim()) || 'this topic';
  const src = platformLabel(source);
  const who = ((creator && String(creator).trim()) || 'the creator').replace(/^@+/, '');
  return `A quick ${src.toLowerCase()} on ${cat} by ${who}.`;
}

function deriveTitleFromUrl(u: string): string {
  try {
    const url = new URL(u);
    const host = url.hostname.replace('www.', '');
    const parts = url.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || host;
    const clean = decodeURIComponent(last).replace(/[-_]+/g, ' ').slice(0, 60);
    const titled = clean.replace(/\b\w/g, (m) => m.toUpperCase());
    if (/instagram\.com/.test(host)) return 'Instagram Reel';
    if (/tiktok\.com/.test(host)) return 'TikTok Video';
    if (/substack\.com/.test(host)) return 'Substack Article';
    return titled || host;
  } catch {
    return 'Untitled';
  }
}

function buildTitle(source: string, creator?: string): string {
  const src = (source || '').toLowerCase();
  if (src.includes('instagram')) return creator ? `Reel by ${creator}` : 'Instagram Reel';
  if (src.includes('tiktok')) return creator ? `TikTok by ${creator}` : 'TikTok Video';
  if (src.includes('substack')) return creator ? `Post by ${creator}` : 'Substack Article';
  return 'Untitled';
}

function isProbablyUrl(s?: string) {
  if (!s) return false;
  return /^https?:\/\//i.test(s) || /\w+\.[a-z]{2,}/i.test(s);
}

// sanitizeText is imported from lib/meta

function platformLabel(source?: string) {
  const src = (source || '').toLowerCase();
  if (src.includes('instagram')) return 'Instagram Reel';
  if (src.includes('tiktok')) return 'TikTok Video';
  if (src.includes('substack')) return 'Substack Article';
  return 'Video';
}

function fallbackTitle(titleRaw: string, source: string, creatorFromUrl?: string, category?: string) {
  const clean = sanitizeText(titleRaw);
  if (clean && !isProbablyUrl(clean)) return clean;
  // Only when title is truly empty/null do we use category
  if ((!titleRaw || !clean) && category && String(category).trim()) return String(category).trim();
  return platformLabel(source);
}

function stableId(url?: string, category?: string) {
  const key = `${url || ''}|${category || ''}`;
  return crypto.createHash('sha1').update(key).digest('hex').slice(0, 16);
}

function parseCreatorFromUrl(u?: string): string | undefined {
  if (!u) return undefined;
  try {
    const url = new URL(u);
    const host = url.hostname.replace('www.', '');
    const path = url.pathname.split('/').filter(Boolean);
    if (host.includes('instagram.com')) return path[0] || undefined; // no leading @
    if (host.includes('tiktok.com')) return (path[0] || '').replace(/^@/, '') || undefined; // strip leading @
    if (host.includes('substack.com')) return host.split('.')[0]; // subdomain
    return undefined;
  } catch {
    return undefined;
  }
}

function normalizeDuration(v: any): string | undefined {
  if (v == null || v === '') return undefined;
  const num = Number(v);
  if (!isNaN(num) && num > 0) {
    // Treat input as minutes
    const secs = Math.round(num * 60);
    const mm = Math.floor(secs / 60).toString().padStart(2, '0');
    const ss = (secs % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }
  return String(v);
}

function buildExcerpt({ source, category, difficulty }: { source?: string; category?: string; difficulty?: string; }): string {
  const bits = [
    source ? `Source: ${capitalize(source)}` : undefined,
    category ? `Category: ${category}` : undefined,
    difficulty ? `Level: ${difficulty}` : undefined,
  ].filter(Boolean);
  return bits.length ? bits.join(' • ') : '';
}

function capitalize(s?: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
