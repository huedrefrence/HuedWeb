// app/api/kh/user/route.ts
import { NextResponse } from "next/server";
import pool from "../../lib/db";

export const runtime = "nodejs";

function isUuid(v: unknown): v is string {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}
export async function GET() {
  // just to confirm the route works in the browser
  return NextResponse.json({ ok: true, route: "/api/kh/user" });
}
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const maybeUserId = body?.user_id;

    // If client already has a user_id, ensure it exists
    if (isUuid(maybeUserId)) {
      const check = await pool.query(`SELECT id FROM anonymous_users WHERE id = $1`, [maybeUserId]);
      if (check.rowCount === 0) {
        await pool.query(`INSERT INTO anonymous_users (id) VALUES ($1)`, [maybeUserId]);
      }
      return NextResponse.json({ success: true, user_id: maybeUserId });
    }

    // Otherwise create a new user_id on the server
    const r = await pool.query(`INSERT INTO anonymous_users (id) VALUES (gen_random_uuid()) RETURNING id`);
    return NextResponse.json({ success: true, user_id: r.rows[0].id });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to create/ensure user", code: err.code },
      { status: 500 }
    );
  }
}
