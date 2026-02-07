import fs from "fs";
import crypto from "crypto";
import * as XLSX from "xlsx";
import path from "path";

export const runtime = "nodejs";

const DATA_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "fashiondata.xlsx"
);
type RawRow = Record<string, unknown>;

function stableId(url = "", category = ""): string {
  const key = `${url}|${category}`;
  return crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
}

function normalizeDuration(v: unknown): string | undefined {
  const num = Number(v);
  if (!Number.isFinite(num) || num <= 0) return undefined;
  const secs = Math.round(num * 60);
  const mm = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

function readLocalXlsx(absPath: string): RawRow[] {
  if (!fs.existsSync(absPath)) {
    console.error("❌ XLSX NOT FOUND:", absPath);
    return [];
  }

  const buffer = fs.readFileSync(absPath);
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" }) as RawRow[];
}

function mapRow(row: RawRow) {
  const r = row as Record<string, string>;

  const url = r.URL || r.Url || r.link || "";
  const category = r.Category || r.category || "";
  const title = r.Title || r.title || category || "Untitled";

  const preview =
    r.Preview_Image_URL ||
    r.preview_image_url ||
    r.thumbnail_url ||
    r.Image ||
    r.image ||
    "";

  return {
  id: r.id || r.ID || stableId(url, category),

  // ✅ FORWARD THE CSV COLUMN EXACTLY
  Content_Type: r.Content_Type,

  title,
  creator: r.Creator || r.Author || "Unknown",
  creator_title: r.creator_title || undefined,
  date: r.Date || r.date || new Date().toISOString(),
  tags: [category].filter(Boolean),
  thumbnail_url: preview,
  Preview_Image_URL: preview,
  cover: preview,
  duration: normalizeDuration(r.Duration || r.duration),
  excerpt: r.Description || r.Excerpt || "",
  url,
  platform: r.Source || r.Platform || "",
  category,
  Category: category,
};


}

export async function GET() {
  try {
    console.log("✅ READING XLSX FROM:", DATA_PATH);

    const rows = readLocalXlsx(DATA_PATH);

    if (!rows.length) {
      console.error("❌ XLSX EMPTY OR UNREADABLE");
      return new Response(JSON.stringify([]), {
        headers: { "content-type": "application/json" },
      });
    }

    const mapped = rows.map(mapRow);

    return new Response(JSON.stringify(mapped), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("🔥 KH API CRASH:", err);
    return new Response(JSON.stringify([]), {
      headers: { "content-type": "application/json" },
    });
  }
}
