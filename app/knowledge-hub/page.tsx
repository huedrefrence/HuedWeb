"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ThumbsUp } from "lucide-react";

// ---------------- ICONS ----------------
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------- Types ----------------
export type ContentType = "video" | "article" | "photo";

export type ContentItem = {
  id: string;
  type: ContentType;
  title: string; // normalized, exactly 3 words or similar
  creator: string; // sanitized (never "reel")
  creatorTitle?: string;
  dateISO: string;
  tags: string[];
  cover: string;
  duration?: string;
  excerpt: string; // cleaned, no “by .”
  url?: string;
  platform?: string;
  commentsCount?: number;
  likesCount?: number;
  avatar?: string;
};

export type RawItem = Partial<{
  id: string | number;
  type: string;
  title: string;
  creator: string;
  creator_title: string;
  author: string;
  timestamp: string | number;
  date: string;
  tags: string[] | string;
  thumbnail_url: string;
  image: string;
  cover: string;
  duration: string | number;
  excerpt: string;
  description: string;
  url: string;
  link: string;
  platform: string;
  category: string;
  Category: string;
  Preview_Image_URL: string;
}>;

// ---------------- Generic Link Wrapper ----------------
function MaybeLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  if (!href) return <>{children}</>;
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <Link
      href={href}
      prefetch={false}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

// ---------------- Helpers (normalization etc.) ----------------
const fixCoverUrl = (u?: string, title?: string) => {
  const t = (title || "Image").toString().slice(0, 50);
  if (u && /^https?:\/\//i.test(u)) return u;
  if (u && u.startsWith("/")) {
    if (/^\/images\/kh\//.test(u)) {
      const text = encodeURIComponent(t);
      return `https://placehold.co/800x500/png?text=${text}`;
    }
    return u;
  }
  const text = encodeURIComponent(t);
  return `https://placehold.co/800x500/png?text=${text}`;
};

const toISO = (v?: string | number) => {
  if (!v) return new Date().toISOString();
  try {
    const d = typeof v === "number" ? new Date(v) : new Date(v);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } catch {
    return new Date().toISOString();
  }
};

const singularType = (t?: string): ContentType => {
  const x = (t || "").toLowerCase();
  if (x.startsWith("vid")) return "video";
  if (x.startsWith("art")) return "article";
  if (x.startsWith("pho")) return "photo";
  return "article";
};

const asArray = (t?: string[] | string): string[] =>
  Array.isArray(t)
    ? t
    : t
    ? String(t)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

// --- helpers for cleaning platform noise & entities ---
const PLATFORM_TITLES = new Set([
  "instagram",
  "instagram reel",
  "tiktok",
  "tiktok - make your day",
  "youtube",
  "substack",
]);
const platformWordRe = /\b(instagram|tiktok|youtube|substack|reel)s?\b/gi;

function decodeEntities(s?: string): string {
  if (!s) return "";
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanTitle({
  rawTitle,
  category,
}: {
  rawTitle?: string;
  category?: string;
}) {
  let t = decodeEntities(rawTitle)?.trim();
  if (!t || PLATFORM_TITLES.has(t.toLowerCase()) || platformWordRe.test(t)) {
    const safeCat = (category || "Untitled").trim();
    return safeCat.split(/\s+/).slice(0, 3).join(" ");
  }
  t = t.replace(platformWordRe, "").replace(/\s{2,}/g, " ").trim();
  return t || (category ? category.split(/\s+/).slice(0, 3).join(" ") : "Untitled");
}

function cleanExcerpt({
  raw,
  category,
  platform,
}: {
  raw?: string;
  category?: string;
  platform?: string;
}) {
  let x = decodeEntities(raw)?.trim() || "";
  x = x.replace(platformWordRe, "").replace(/\s{2,}/g, " ").trim();
  if (!x) {
    const cat = (category || "this topic").trim();
    return `Learn the basics of ${cat} in this short ${
      platform ? "piece" : "guide"
    }.`;
  }
  x = x.replace(/^[,.\-–—:;]+/g, "").trim();
  return x;
}

function normalizeCreator(c?: string) {
  const v = (c || "").trim();
  if (!v) return "Unknown";
  if (v.toLowerCase() === "reel") return "";
  return v;
}

export function normalizeItem(r: RawItem): ContentItem {
  const category = r.category ?? r.Category;
  const tags: string[] = asArray(r.tags);
  if (category && !tags.includes(category)) tags.unshift(category);

  const platform = r.platform?.toLowerCase();
  const title = cleanTitle({ rawTitle: r.title, category });
  const excerpt = cleanExcerpt({
    raw: r.excerpt ?? r.description,
    category,
    platform,
  });

  return {
    id: String(r.id ?? crypto.randomUUID()),
    type: singularType(r.type),
    title,
    creator: normalizeCreator(r.creator ?? r.author),
    creatorTitle: r.creator_title,
    dateISO: toISO(r.timestamp ?? r.date),
    tags,
    cover: fixCoverUrl(
  r.Preview_Image_URL ||          
  r.thumbnail_url ||
  r.image ||
  r.cover,
  title
),
    duration: r.duration ? String(r.duration) : undefined,
    excerpt,
    url: r.url ?? r.link,
    platform,
    commentsCount: undefined,
    likesCount: undefined,
    avatar: undefined,
  };
}

// ---------------- Mock Data ----------------
const TOPIC_TAGS = [
  "Assessing Fashion Needs",
  "Understanding Fashion Basics",
  "Sourcing Specific Pieces",
  "Body Positivity",
  "Understanding Sustainable Fashion",
  "Wardrobe Management",
  "Occasion & Context",
  "Cultural Awareness",
  "Style Principles",
];

const TAG_COLORS: Record<string, string> = {
  "Assessing Fashion Needs": "#6AB0E4",
  "Understanding Fashion Basics": "#66E57E4D",
  "Sourcing Specific Pieces": "#A587D14D",
  "Body Positivity": "#F5E2234D",
  "Understanding Sustainable Fashion": "#80E0DD4D",
  "Wardrobe Management": "#F793E84D",
  "Occasion & Context": "#F9AA314D",
  "Cultural Awareness": "#FF56564D",
  "Style Principles": "#F27B5D4D",
};

const CREATORS = [
  "Style Guru",
  "Fashion Forward",
  "TrendSetter",
  "Ecochic",
  "Upcycle Master",
];

// ---------------- Header ----------------
function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Our Mission", href: "/mission" },
    { name: "Knowledge Hub", href: "/knowledge-hub" },
    { name: "Luminaries", href: "/luminaries" },
    { name: "FAQ", href: "/resources" },
    { name: "Monthly Highlights", href: "/highlights" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Community Engagement", href: "/community" },
    { name: "Hued Beta", href: "/beta" },
  ];

  return (
    <header className="bg-white text-neutral-900 border-b border-black/10">
      <div className="mx-auto max-w-[1300px] flex items-center justify-start gap-20 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.webp"
            alt="Hued Logo"
            width={36}
            height={36}
            priority
          />
          <span className="sr-only">Hued</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-['Euclid Circular B'] text-[15px]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-[#2F80ED] font-medium"
                    : "text-neutral-900 hover:text-[#2F80ED] transition-colors"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// ---------------- Small UI Bits ----------------
const TYPE_OPTIONS = [
  { label: "Photos", value: "photo" },
  { label: "Videos", value: "video" },
  { label: "Articles", value: "article" },
];

function TagPill({
  label,
  active,
  onClick,
  bg,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  bg?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[14px] border transition shadow-sm ${
        active
          ? "border-black/10 ring-1 ring-black/10"
          : "border-black/10 hover:border-black/20"
      } text-neutral-900`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {label}
    </button>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-neutral-400"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-[15px] text-neutral-800">{label}</span>
    </label>
  );
}
function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="radio"
        className="h-4 w-4"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-[15px] text-neutral-800">{label}</span>
    </label>
  );
}

// Interactive star rating for feedback
function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={filled ? "star filled" : "star empty"}
      className="text-amber-500"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 17.3l-5.56 3.27 1.5-6.28L2 9.97l6.4-.55L12 3.5l3.6 5.92 6.4.55-5.94 4.32 1.5 6.28z" />
      </svg>
    </button>
  );
}
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div role="radiogroup" aria-label="feedback rating" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= value} onClick={() => onChange(n)} />
      ))}
    </div>
  );
}

// ------- client-only upvote helpers (localStorage) -------
const LS_COUNTS = "kh_like_counts";
const LS_VOTED = "kh_like_voted";

function readCounts(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(LS_COUNTS) || "{}");
  } catch {
    return {};
  }
}
function writeCounts(map: Record<string, number>) {
  try {
    localStorage.setItem(LS_COUNTS, JSON.stringify(map));
  } catch {}
}
function readVoted(): Record<string, 1> {
  try {
    return JSON.parse(localStorage.getItem(LS_VOTED) || "{}");
  } catch {
    return {};
  }
}
function writeVoted(map: Record<string, 1>) {
  try {
    localStorage.setItem(LS_VOTED, JSON.stringify(map));
  } catch {}
}

// ---------------- Card ----------------
function ContentCard({ item }: { item: ContentItem }) {
  const creatorDisplay = (item.creator || "").replace(/^@+/, "");
  const initials = creatorDisplay
    ? creatorDisplay
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "HU";

  const date = useMemo(
    () =>
      new Date(item.dateISO).toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    [item.dateISO]
  );

  // --- Upvote (client only) ---
  const [likes, setLikes] = useState<number>(item.likesCount ?? 0);
  const [voted, setVoted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const counts = readCounts();
      const votedMap = readVoted();
      if (counts[item.id] != null) setLikes(Math.max(0, counts[item.id]));
      if (votedMap[item.id]) setVoted(true);
    } catch {}
  }, [item.id]);

  const toggleUpvote = () => {
    const nextVoted = !voted;
    const nextLikes = Math.max(0, likes + (nextVoted ? 1 : -1));
    setVoted(nextVoted);
    setLikes(nextLikes);
    try {
      const counts = readCounts();
      const votedMap = readVoted();
      counts[item.id] = nextLikes;
      if (nextVoted) votedMap[item.id] = 1;
      else delete votedMap[item.id];
      writeCounts(counts);
      writeVoted(votedMap);
    } catch {}
  };

  return (
    <article className="rounded-3xl overflow-hidden bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-white">
      {/* Media */}
      <MaybeLink href={item.url} ariaLabel={`Open ${item.title || "content"}`}>
        <div className="relative h-[220px]">
          <Image
            src={item.cover}
            alt={item.title}
            fill
            className="object-cover"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="mt-4 self-center bg-black/50 rounded-full h-12 w-12 grid place-content-center text-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7-11-7z" />
                </svg>
              </div>
              <div className="mb-2 px-3 flex items-center justify-between text-white text-xs">
                <span>00:15</span>
                <div className="flex-1 mx-2 h-1 rounded bg-white/40">
                  <div
                    className="h-1 rounded bg-white/90"
                    style={{ width: "25%" }}
                  />
                </div>
                <span>{item.duration || "01:20"}</span>
              </div>
            </div>
          )}
        </div>
      </MaybeLink>

      {/* Body */}
      <div className="p-3">
        <div className="rounded-2xl border border-white bg-[#FFF5EA] p-4">
          {/* Creator row */}
          <div className="flex items-center gap-3 text-sm">
            <div className="h-10 w-10 rounded-full bg-[#D9EBFF] grid place-content-center font-semibold text-neutral-800 ring-1 ring-black/10">
              {initials}
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-neutral-900">
                {creatorDisplay}
              </div>
              {item.creatorTitle && (
                <div className="text-neutral-600 text-[12px]">
                  {item.creatorTitle}
                </div>
              )}
            </div>
            <div className="ml-auto text-[12px] text-neutral-600">{date}</div>
          </div>

          {/* Title & excerpt */}
          <h3 className="break-words line-clamp-2 mt-3 text-[18px] font-semibold leading-snug text-neutral-900">
            <MaybeLink
              href={item.url}
              ariaLabel={`Open ${item.title || "content"}`}
              className={
                item.url ? "hover:underline decoration-neutral-300" : undefined
              }
            >
              {item.title}
            </MaybeLink>
          </h3>
          {item.excerpt && (
            <p className="mt-2 text-[14px] leading-6 text-neutral-700 line-clamp-3">
              {item.excerpt}
            </p>
          )}

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[12px] px-3 py-[6px] rounded-xl bg-[#E9E6E0] text-neutral-800 border border-black/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 rounded-2xl bg-[#F6EEE5] border border-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-neutral-800 font-medium">
              View Gallery
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare
                  className="w-5 h-5 text-neutral-600"
                  strokeWidth={1.8}
                />
                <span className="text-[14px] text-neutral-700 font-medium">
                  {item.commentsCount ?? 0}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleUpvote}
                aria-pressed={voted}
                className="flex items-center gap-1"
                title={voted ? "Remove upvote" : "Upvote"}
              >
                <ThumbsUp
                  className={`w-5 h-5 ${
                    voted ? "text-[#2F80ED]" : "text-neutral-600"
                  }`}
                  fill={voted ? "#2F80ED20" : "none"}
                  strokeWidth={1.8}
                />
                <span
                  className={`text-[14px] font-medium ${
                    voted ? "text-[#2F80ED]" : "text-neutral-700"
                  }`}
                >
                  {likes}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ---------------- Sidebar ----------------
function FilterSidebar({
  selectedTypes,
  setSelectedTypes,
  selectedCreators,
  setSelectedCreators,
  dateRange,
  setDateRange,
  clearAll,
}: {
  selectedTypes: string[];
  setSelectedTypes: (v: string[]) => void;
  selectedCreators: string[];
  setSelectedCreators: (v: string[]) => void;
  dateRange: string;
  setDateRange: (v: string) => void;
  clearAll: () => void;
}) {
  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) => {
    setList(
      list.includes(value)
        ? list.filter((x) => x !== value)
        : [...list, value]
    );
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-[#FDF9F0] p-5 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-[#FF8A00]">Filters</h3>
        <button
          onClick={clearAll}
          className="text-sm text-neutral-600 hover:text-neutral-900"
        >
          Clear all filters
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-medium">Content type</h4>
          {TYPE_OPTIONS.map(({ label, value }) => (
            <div key={value} className="mb-2">
              <Checkbox
                label={label}
                checked={selectedTypes.includes(value)}
                onChange={() =>
                  toggle(selectedTypes, setSelectedTypes, value)
                }
              />
            </div>
          ))}
        </div>

        <div>
          <h4 className="mb-2 font-medium">Creators</h4>
          {CREATORS.map((c) => (
            <div key={c} className="mb-2">
              <Checkbox
                label={c}
                checked={selectedCreators.includes(c)}
                onChange={() =>
                  toggle(selectedCreators, setSelectedCreators, c)
                }
              />
            </div>
          ))}
        </div>

        <div>
          <h4 className="mb-2 font-medium">Date</h4>
          {["Anytime", "Today", "This Week", "This Month"].map((r) => (
            <div key={r} className="mb-2">
              <Radio
                label={r}
                checked={dateRange === r}
                onChange={() => setDateRange(r)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- Page ----------------
export default function KnowledgeHubPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(TOPIC_TAGS[0]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>("Anytime");
  const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const clearAll = useCallback(() => {
    setSelectedTypes([]);
    setSelectedCreators([]);
    setDateRange("Anytime");
  }, []);

  useEffect(() => {
    const API =
      process.env.NEXT_PUBLIC_KH_API ||
      "/api/kh?source=csv&local=1&enrich=1";

    const fetchData = async () => {
      setLoading(true);
      try {
        if (API) {
          const r = await fetch(API);
          if (r.ok) {
            const raw: RawItem[] = await r.json();
            if (Array.isArray(raw) && raw.length > 0) {
              setItems(raw.map(normalizeItem));
              setLoading(false);
              return;
            }
          }
        }
        // fallback to local JSON
        const r2 = await fetch("/data/kh.json");
        if (r2.ok) {
          const raw2: RawItem[] = await r2.json();
          setItems(raw2.map(normalizeItem));
        }
      } catch (e) {
        console.warn("KH fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showEmpty = !loading && items.length === 0;

  // Filtering logic
  const filtered = useMemo(() => {
    if (!items.length) return [];

    const q = query.trim().toLowerCase();
    const now = new Date();

    const withinRange = (d: Date) => {
      if (dateRange === "Anytime") return true;
      if (dateRange === "Today") return d.toDateString() === now.toDateString();
      if (dateRange === "This Week") {
        const past7 = new Date(now);
        past7.setDate(now.getDate() - 7);
        return d >= past7;
      }
      if (dateRange === "This Month") {
        const past30 = new Date(now);
        past30.setDate(now.getDate() - 30);
        return d >= past30;
      }
      return true;
    };

    let res = items.filter((it) => {
      const d = new Date(it.dateISO);
      const typeOk = selectedTypes.length
        ? selectedTypes.includes(it.type)
        : true;
      const creatorOk = selectedCreators.length
        ? selectedCreators.includes(it.creator)
        : true;
      const dateOk = withinRange(d);
      const tagOk = activeTag
        ? (it.tags.concat([it.title]).join(" ").toLowerCase().includes(
            activeTag.toLowerCase()
          ))
        : true;
      const hay = (
        it.title +
        " " +
        it.creator +
        " " +
        it.tags.join(" ") +
        " " +
        it.excerpt
      ).toLowerCase();
      const qOk = q ? hay.includes(q) : true;
      return typeOk && creatorOk && dateOk && tagOk && qOk;
    });

    if (activeTag && res.length === 0) {
      res = items.filter((it) => {
        const d = new Date(it.dateISO);
        const typeOk = selectedTypes.length
          ? selectedTypes.includes(it.type)
          : true;
        const creatorOk = selectedCreators.length
          ? selectedCreators.includes(it.creator)
          : true;
        const dateOk = withinRange(d);
        const hay = (
          it.title +
          " " +
          it.creator +
          " " +
          it.tags.join(" ") +
          " " +
          it.excerpt
        ).toLowerCase();
        const qOk = q ? hay.includes(q) : true;
        return typeOk && creatorOk && dateOk && qOk;
      });
    }

    if (sortBy === "date") {
      res = [...res].sort(
        (a, b) => +new Date(b.dateISO) - +new Date(a.dateISO)
      );
    }

    return res;
  }, [
    items,
    query,
    activeTag,
    selectedTypes,
    selectedCreators,
    dateRange,
    sortBy,
  ]);

  const recommended = useMemo(() => {
    if (!items.length) return [];
    const pool = activeTag
      ? items.filter((it) =>
          (it.tags.join(" ").toLowerCase() +
            " " +
            it.title.toLowerCase()).includes(activeTag.toLowerCase())
        )
      : items;
    return [...pool]
      .sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO))
      .slice(0, 4);
  }, [items, activeTag]);

  return (
    <div className="min-h-screen text-neutral-900 bg-gradient-to-b from-white via-[#FFF9F1] to-[#FFF2E4]">
      <Header />

      <main className="mx-auto max-w-[1240px] px-4 md:px-6 lg:px-8 py-8">
        {/* Mobile filters button */}
        <div className="mb-4 lg:hidden flex justify-end">
          <button
            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium shadow-sm"
            onClick={() => setSidebarOpen(true)}
          >
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-24">
            <FilterSidebar
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedCreators={selectedCreators}
              setSelectedCreators={setSelectedCreators}
              dateRange={dateRange}
              setDateRange={setDateRange}
              clearAll={clearAll}
            />
          </aside>

          {/* Right Column */}
          <section>
            {/* Search */}
            <div className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 bg-white">
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for styles, creators or topics..."
                className="w-full outline-none text-[15px] bg-transparent"
              />
            </div>

            {/* Topic tags */}
            <div className="mt-4 flex flex-wrap gap-3">
              {TOPIC_TAGS.map((t) => (
                <TagPill
                  key={t}
                  label={t}
                  active={activeTag === t}
                  onClick={() =>
                    setActiveTag(activeTag === t ? null : t)
                  }
                  bg={TAG_COLORS[t]}
                />
              ))}
            </div>

            {/* Header row */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-neutral-700">
                Results for “
                {activeTag
                  ? activeTag.toLowerCase()
                  : query || "all"}
                ”
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neutral-600">Sort by:</span>
                <select
                  className="rounded-lg border border-black/10 bg-white px-2 py-1"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "relevance" | "date")
                  }
                >
                  <option value="relevance">relevance</option>
                  <option value="date">date</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="mt-8 text-center text-neutral-600">
                <p>Loading content…</p>
              </div>
            ) : showEmpty ? (
              <div className="mt-8 text-center text-neutral-600">
                <p>No results yet. Check your data source or filters.</p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((item, i) => (
                  <ContentCard key={`${item.id}-${i}`} item={item} />
                ))}
              </div>
            )}

            {/* Recommended */}
            {!loading && recommended.length > 0 && (
              <>
                <div className="mt-10 flex items-center justify-between">
                  <h2 className="text-[18px] font-semibold">
                    Recommended for you
                  </h2>
                  <Link
                    href="#"
                    className="text-sm text-neutral-600 hover:text-neutral-900"
                  >
                    View All
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recommended.map((item, i) => (
                    <ContentCard
                      key={`rec-${item.id}-${i}`}
                      item={item}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Feedback */}
            <div className="mt-10 rounded-2xl border border-black/10 bg-[#FFF9F1] p-6">
              <h3 className="font-semibold">Help Us Improve</h3>
              <div className="mt-2">
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <input
                  className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px]"
                  placeholder="Suggest a new fashion category or tag..."
                />
                <button className="rounded-xl bg-neutral-900 text-white px-4 py-3">
                  Submit
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-[#FDF9F0] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#FF8A00]">
                Filters
              </h3>
              <button
                className="text-sm text-neutral-600 hover:text-neutral-900"
                onClick={() => setSidebarOpen(false)}
              >
                Close ✕
              </button>
            </div>
            <FilterSidebar
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedCreators={selectedCreators}
              setSelectedCreators={setSelectedCreators}
              dateRange={dateRange}
              setDateRange={setDateRange}
              clearAll={clearAll}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1F1F1F] text-white mt-16">
        <div className="mx-auto max-w-[1300px] px-6 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            {/* Left: Brand */}
            <div className="flex flex-col max-w-sm">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.webp"
                  alt="Hued"
                  width={36}
                  height={36}
                  priority
                />
                <span className="text-[28px] font-semibold leading-none">
                  Hued
                </span>
              </div>
              <p className="mt-6 text-[14px] text-white/80">
                “Inspiring Fashion Knowledge”
              </p>
            </div>

            {/* Right: Links & Contact (grouped) */}
            <div className="flex flex-col sm:flex-row gap-16">
              {/* Quick Links */}
              <div>
                <h3 className="text-[14px] tracking-widest text-[#2BB7A3] font-semibold">
                  QUICK LINKS
                </h3>
                <ul className="mt-5 space-y-3 text-[14px]">
                  <li>
                    <Link href="/" className="hover:text-white/90">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mission"
                      className="hover:text-white/90"
                    >
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/knowledge-hub"
                      className="hover:text-white/90"
                    >
                      Knowledge Hub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/luminaries"
                      className="hover:text-white/90"
                    >
                      Luminaries
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white/90">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/highlights"
                      className="hover:text-white/90"
                    >
                      Monthly Highlights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/get-involved"
                      className="hover:text-white/90"
                    >
                      Get Involved
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="hover:text-white/90"
                    >
                      Community Engagement
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-[14px] tracking-widest text-[#2BB7A3] font-semibold">
                  CONTACT
                </h3>
                <ul className="mt-5 space-y-3 text-[14px]">
                  <li>
                    <a
                      href="mailto:Huemantie@Icloud.com"
                      className="hover:text-white/90"
                    >
                      Huemantie@Icloud.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+14805296306"
                      className="hover:text-white/90"
                    >
                      +1480-529-6306
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
