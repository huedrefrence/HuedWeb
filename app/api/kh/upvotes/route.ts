import { NextResponse } from "next/server";
import pool from "../../lib/db";

export const runtime = "nodejs";

/**
 * GET /api/kh/upvotes?ids=c_abc,c_def,...
 * Returns map: { [content_id]: upvotesCount }
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids") || "";
    const ids = idsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ success: true, counts: {} });
    }

    // Count only "upvote true" events
    const r = await pool.query(
      `
      SELECT content_id, COUNT(*)::int AS upvotes
      FROM content_interactions
      WHERE event_type='upvote'
        AND upvoted=TRUE
        AND content_id = ANY($1::text[])
      GROUP BY content_id
      `,
      [ids]
    );

    const counts: Record<string, number> = {};
    for (const row of r.rows) counts[row.content_id] = row.upvotes;

    // fill missing with 0
    for (const id of ids) if (counts[id] == null) counts[id] = 0;

    return NextResponse.json({ success: true, counts });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to load upvotes", code: err.code },
      { status: 500 }
    );
  }
}
