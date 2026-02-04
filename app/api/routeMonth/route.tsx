import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOOoFMxDA-HSLJylzw7cgH7IBKCJcLK7pUmpZwLFUhSwpwZe0o6qpDDGl11gPN4G3E/exec";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    try {
      const result = JSON.parse(text);
      return NextResponse.json(result);
    } catch {
      return NextResponse.json({
        status: "error",
        message: "Apps Script did not return JSON",
        raw: text,
      });
    }
  } catch (err: unknown) {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
      ? err
      : "Unknown error";

  return NextResponse.json(
    { status: "error", message },
    { status: 500 }
  );
}
}
