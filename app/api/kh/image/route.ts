import fs from "fs";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

const DATA_PATH =
  process.env.KH_LOCAL_CSV_PATH || "C:/kh-data/fashiondata.xlsx";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const i = Number(searchParams.get("i") || "0");

    if (!fs.existsSync(DATA_PATH)) {
      return new Response("XLSX file not found", { status: 404 });
    }

    const wb = XLSX.readFile(DATA_PATH);

    // ✅ Extract ALL embedded images from the workbook
    const imageMap = wb.Workbook?.Media;

    if (!imageMap || imageMap.length === 0) {
      return new Response("No images inside XLSX", { status: 404 });
    }

    if (!imageMap[i]) {
      return new Response("Image index out of range", { status: 404 });
    }

    const img = imageMap[i];

    return new Response(img.content, {
      status: 200,
      headers: {
        "Content-Type": img.type || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
