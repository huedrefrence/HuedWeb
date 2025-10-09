// app/api/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await fetch(
      "https://script.google.com/macros/s/AKfycbzFT9Q903yc4gcZP2lTxx1km-Lgm2fozTGwdwFiM8Ewz5xwP-I81ZhD1Km2XoR5rFNV/exec", // Google Apps Script web app
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}
