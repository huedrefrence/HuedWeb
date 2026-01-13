// app/api/kh/stats/route.ts
import { NextResponse } from "next/server";
import pool from "../../lib/db";

export const runtime = "nodejs";

function isUuid(v: unknown): v is string {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

// Supports: 1d, 7d, 30d, all
function rangeToSql(range: string | null): { where: string; params: unknown[] } {
  if (!range || range === "all") return { where: "TRUE", params: [] };

  const m = /^(\d+)\s*d$/i.exec(range.trim());
  if (!m) return { where: "TRUE", params: [] };

  const days = Math.max(1, Math.min(365, Number(m[1])));
  return { where: `created_at >= NOW() - ($1::int * INTERVAL '1 day')`, params: [days] };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");
    const range = searchParams.get("range"); // e.g. "7d" or "30d" or "all"

    if (!isUuid(userId)) {
      return NextResponse.json({ success: false, error: "user_id (uuid) is required" }, { status: 400 });
    }

    const r1 = rangeToSql(range);

    // 1) Total time spent (seconds) - from sessions
    const timeQ = await pool.query(
      `
      SELECT COALESCE(SUM(total_seconds), 0)::int AS total_seconds
      FROM activity_sessions
      WHERE user_id = $1
      `,
      [userId]
    );

    // 2) Total upvotes (count of "upvote true" events in range)
    const upvoteQ = await pool.query(
      `
      SELECT COALESCE(COUNT(*), 0)::int AS total_upvotes
      FROM content_interactions
      WHERE user_id = $1
        AND event_type = 'upvote'
        AND upvoted = TRUE
        AND ${r1.where}
      `,
      [userId, ...r1.params]
    );

    // 3) Active topics (top 10 by events, in range)
    const topicsQ = await pool.query(
      `
      SELECT topic, COUNT(*)::int AS hits
      FROM content_interactions
      WHERE user_id = $1
        AND topic IS NOT NULL
        AND topic <> ''
        AND ${r1.where}
      GROUP BY topic
      ORDER BY hits DESC
      LIMIT 10
      `,
      [userId, ...r1.params]
    );

    // 4) Most upvoted categories (top 10)
    const catsQ = await pool.query(
      `
      SELECT
        COALESCE(category, 'Unknown') AS category,
        category_id,
        COUNT(*)::int AS upvotes
      FROM content_interactions
      WHERE user_id = $1
        AND event_type = 'upvote'
        AND upvoted = TRUE
        AND ${r1.where}
      GROUP BY category, category_id
      ORDER BY upvotes DESC
      LIMIT 10
      `,
      [userId, ...r1.params]
    );

    return NextResponse.json({
      success: true,
      user_id: userId,
      range: range ?? "all",
      total_time_seconds: timeQ.rows[0].total_seconds,
      total_upvotes: upvoteQ.rows[0].total_upvotes,
      active_topics: topicsQ.rows,
      most_upvoted_categories: catsQ.rows,
    });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to compute stats", code: err.code },
      { status: 500 }
    );
  }
}
