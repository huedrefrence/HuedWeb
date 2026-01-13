// app/api/kh/analytics/route.ts
import { NextResponse } from "next/server";
import pool from "../../lib/db";

export const runtime = "nodejs";

function isUuid(v: unknown): v is string {
  return (
    typeof v === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
  );
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
    const userId = searchParams.get("user_id"); // optional
    const range = searchParams.get("range") ?? "all"; // 7d / 30d / all

    const r1 = rangeToSql(range);

    // If user_id is provided, filter by it; otherwise return global stats
    const userWhere = userId && isUuid(userId) ? `AND user_id = $${r1.params.length + 1}` : "";
    const userParams = userId && isUuid(userId) ? [userId] : [];

    // 1) Total dwell time per category
    const dwellByCategory = await pool.query(
      `
      SELECT
        category,
        COALESCE(SUM(duration_seconds), 0)::int AS total_seconds,
        ROUND(COALESCE(SUM(duration_seconds), 0) / 60.0, 2) AS total_minutes
      FROM content_interactions
      WHERE event_type = 'dwell'
        AND category IS NOT NULL AND category <> ''
        AND ${r1.where}
        ${userWhere}
      GROUP BY category
      ORDER BY total_seconds DESC
      LIMIT 50
      `,
      [...r1.params, ...userParams]
    );

    // 2) Topic selects per category
    const selectsByCategory = await pool.query(
      `
      SELECT
        category,
        COUNT(*)::int AS selections
      FROM content_interactions
      WHERE event_type = 'topic_select'
        AND category IS NOT NULL AND category <> ''
        AND ${r1.where}
        ${userWhere}
      GROUP BY category
      ORDER BY selections DESC
      LIMIT 50
      `,
      [...r1.params, ...userParams]
    );

    // 3) Upvotes per category
    const upvotesByCategory = await pool.query(
      `
      SELECT
        category,
        COUNT(*) FILTER (WHERE upvoted = TRUE)::int AS upvotes
      FROM content_interactions
      WHERE event_type = 'upvote'
        AND category IS NOT NULL AND category <> ''
        AND ${r1.where}
        ${userWhere}
      GROUP BY category
      ORDER BY upvotes DESC
      LIMIT 50
      `,
      [...r1.params, ...userParams]
    );

    // 4) Overall totals
    const totals = await pool.query(
      `
      SELECT
        COALESCE(SUM(duration_seconds), 0)::int AS total_dwell_seconds,
        COUNT(*) FILTER (WHERE event_type='topic_select')::int AS total_topic_selects,
        COUNT(*) FILTER (WHERE event_type='upvote' AND upvoted=TRUE)::int AS total_upvotes
      FROM content_interactions
      WHERE ${r1.where}
      ${userWhere}
      `,
      [...r1.params, ...userParams]
    );

    return NextResponse.json({
      success: true,
      range,
      scope: userId && isUuid(userId) ? "user" : "global",
      user_id: userId && isUuid(userId) ? userId : null,
      totals: totals.rows[0],
      dwell_by_category: dwellByCategory.rows,
      selects_by_category: selectsByCategory.rows,
      upvotes_by_category: upvotesByCategory.rows,
    });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to compute analytics", code: err.code },
      { status: 500 }
    );
  }
}
