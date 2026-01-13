// app/api/kh/session/start/route.ts
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export const runtime = "nodejs";

function isUuid(v: unknown): v is string {
  return (
    typeof v === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    console.log("SESSION START HIT", new Date().toISOString(), body);

    const userId = (body as { user_id?: unknown })?.user_id;

    if (!isUuid(userId)) {
      return NextResponse.json(
        { success: false, error: "user_id (uuid) is required" },
        { status: 400 }
      );
    }

    // ✅ DB CHECK (proves which DB your Next.js server is using)
    const who = await pool.query("select current_database() as db, current_user as usr");
    console.log("DB CHECK", who.rows[0]);

    // create session
    const r = await pool.query(
      `INSERT INTO activity_sessions (id, started_at, user_id)
       VALUES (gen_random_uuid(), NOW(), $1)
       RETURNING id, started_at`,
      [userId]
    );

    console.log("SESSION START INSERTED", r.rows[0]);

    return NextResponse.json({
      success: true,
      session_id: r.rows[0].id,
      started_at: r.rows[0].started_at,
    });
  } catch (e) {
    console.error("SESSION START ERROR", e);
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to start session", code: err.code },
      { status: 500 }
    );
  }
}
