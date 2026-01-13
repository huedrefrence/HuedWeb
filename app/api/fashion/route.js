import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "enhanced_fashion_data.xlsx"
    );

    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    return NextResponse.json(json);
  } catch (error) {
    console.error("XLSX Error:", error);
    return NextResponse.json({ error: "Failed to read XLSX" }, { status: 500 });
  }
}
