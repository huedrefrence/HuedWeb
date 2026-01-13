// app/api/kh/session/end/route.ts
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export const runtime = "nodejs";

function isUuid(v: unknown): v is string {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = body?.session_id;

    if (!isUuid(sessionId)) {
      return NextResponse.json({ success: false, error: "session_id (uuid) is required" }, { status: 400 });
    }

    // set ended_at once; compute total_seconds using started_at
    const r = await pool.query(
      `
      UPDATE activity_sessions
      SET
        ended_at = COALESCE(ended_at, NOW()),
        total_seconds = GREATEST(
          0,
          COALESCE(
            total_seconds,
            FLOOR(EXTRACT(EPOCH FROM (COALESCE(ended_at, NOW()) - started_at)))::int
          )
        )
      WHERE id = $1
      RETURNING id, started_at, ended_at, total_seconds
      `,
      [sessionId]
    );

    if (r.rowCount === 0) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, session: r.rows[0] });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to end session", code: err.code },
      { status: 500 }
    );
  }
}
