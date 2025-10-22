// app/api/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await fetch(
      "https://script.google.com/macros/s/AKfycbxO55S5hkgngYSV5E8kBG-esiRpGdYcQgG041yIknvpJX9cC3BN7cHiYIikly-YkSKg/exec", // Google Apps Script web app
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
