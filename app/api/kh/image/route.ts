import fs from "fs";
import JSZip from "jszip";

export const runtime = "nodejs";

const DATA_PATH = process.env.KH_LOCAL_CSV_PATH ?? "C:/kh-data/fashiondata.xlsx";

function toIndex(v: string | null): number {
  const n = Number(v ?? "0");
  if (!Number.isFinite(n)) return 0;
  return Math.trunc(n);
}

function mimeFromPath(p: string): string {
  const ext = p.split(".").pop()?.toLowerCase() ?? "";
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "bmp":
      return "image/bmp";
    case "tif":
    case "tiff":
      return "image/tiff";
    default:
      return "application/octet-stream";
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const i = toIndex(searchParams.get("i"));

    if (!fs.existsSync(DATA_PATH)) {
      return new Response("XLSX file not found", { status: 404 });
    }

    const fileBuffer: Buffer = fs.readFileSync(DATA_PATH);
    const zip: JSZip = await JSZip.loadAsync(fileBuffer);

    const mediaFiles: string[] = Object.keys(zip.files)
      .filter((p) => p.startsWith("xl/media/") && !zip.files[p].dir)
      .sort();

    if (mediaFiles.length === 0) {
      return new Response("No images inside XLSX", { status: 404 });
    }

    if (i < 0 || i >= mediaFiles.length) {
      return new Response("Image index out of range", { status: 404 });
    }

    const filePath = mediaFiles[i];
    const file = zip.file(filePath);
    if (!file) {
      return new Response("Image not found in XLSX", { status: 404 });
    }

    // IMPORTANT: return ArrayBuffer/Uint8Array, not Buffer (fixes TS BodyInit error)
    const imgArrayBuffer: ArrayBuffer = await file.async("arraybuffer");
    const body = new Uint8Array(imgArrayBuffer);

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": mimeFromPath(filePath),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(message, { status: 500 });
  }
}
