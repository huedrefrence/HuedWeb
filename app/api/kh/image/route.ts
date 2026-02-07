// app/api/kh/image/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function toIndex(v: string | null): number {
  const n = Number(v ?? "0");
  if (!Number.isFinite(n)) return 0;
  return Math.trunc(n);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const i = toIndex(searchParams.get("i"));

    // Example value:
    // https://<projectref>.supabase.co/storage/v1/object/public/kh_images
    const base = process.env.SUPABASE_STORAGE_PUBLIC_BASE;

    if (!base) {
      return NextResponse.json(
        { success: false, error: "Missing SUPABASE_STORAGE_PUBLIC_BASE" },
        { status: 500 }
      );
    }

    if (i < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid image index" },
        { status: 400 }
      );
    }

    // If you upload files as: 0.png, 1.png, 2.png, ...
    const url = `${base.replace(/\/$/, "")}/${i}.png`;

    return NextResponse.redirect(url, 302);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
