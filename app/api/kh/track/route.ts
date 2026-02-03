// app/api/kh/track/route.ts
import { NextResponse } from "next/server";
import pool from "../../lib/db";

export const runtime = "nodejs";

console.log("TRACK ROUTE LOADED", new Date().toISOString());

/**
 * Expected events:
 * - topic_select: { topic, category, category_id? }
 * - upvote: { content_id, category, topic, upvoted: true/false }
 * - dwell: { duration_seconds, category, topic, content_id? }
 * - content_open: { content_id, category?, topic? }
 */

type TrackBody = {
  user_id: string;
  session_id: string;
  event_type: string;

  source?: string | null;
  category?: string | null;
  topic?: string | null;

  // IMPORTANT: your UI uses string ids like "c_abc123..."
  content_id?: string | null;

  // optional (if you use numeric ids somewhere else)
  category_id?: number | string | null;

  upvoted?: boolean | null;
  duration_seconds?: number | string | null;
};

function isUuid(v: unknown): v is string {
  return (
    typeof v === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
  );
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function toIntOrNull(v: unknown): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function toTrimmedStringOrNull(v: unknown): string | null {
  if (!isNonEmptyString(v)) return null;
  const s = v.trim();
  if (!s || s === "null" || s === "undefined") return null;
  return s;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TrackBody;

    console.log("TRACK BODY", body);
    console.log("TRACK content_id", body?.content_id);

    const userId = body?.user_id;
    const sessionId = body?.session_id;
    const eventType = body?.event_type;

    if (!isUuid(userId)) {
      return NextResponse.json({ success: false, error: "user_id (uuid) is required" }, { status: 400 });
    }
    if (!isUuid(sessionId)) {
      return NextResponse.json({ success: false, error: "session_id (uuid) is required" }, { status: 400 });
    }
    if (!isNonEmptyString(eventType)) {
      return NextResponse.json({ success: false, error: "event_type is required" }, { status: 400 });
    }

    // ✅ category/topic: never null in DB (use UNKNOWN fallback)
    const category = toTrimmedStringOrNull(body?.category) ?? toTrimmedStringOrNull(body?.topic) ?? "UNKNOWN";
    const topic = toTrimmedStringOrNull(body?.topic) ?? toTrimmedStringOrNull(body?.category) ?? "UNKNOWN";
    const source = toTrimmedStringOrNull(body?.source); 


    // ✅ content_id must be TEXT (string) — do NOT parse to int
    const contentId = toTrimmedStringOrNull(body?.content_id);

    // optional numeric
    const categoryId = toIntOrNull(body?.category_id);

    const upvoted = typeof body?.upvoted === "boolean" ? body.upvoted : null;
    const durationSeconds = toIntOrNull(body?.duration_seconds);

    // sanity checks
    if (durationSeconds !== null && durationSeconds < 0) {
      return NextResponse.json({ success: false, error: "duration_seconds cannot be negative" }, { status: 400 });
    }

  if (eventType.trim() === "upvote") {
  if (!contentId) {
    return NextResponse.json({ success: false, error: "content_id is required for upvote events" }, { status: 400 });
  }
  if (category === "UNKNOWN" || topic === "UNKNOWN") {
    return NextResponse.json({ success: false, error: "category and topic are required for upvote events" }, { status: 400 });
  }
}


    console.log("TRACK INSERT ABOUT TO RUN");

    const r = await pool.query(
      `
      INSERT INTO content_interactions
(session_id, user_id, event_type, content_id, category_id, category, topic, source, upvoted, duration_seconds)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id, created_at
      `,
      [sessionId, userId, eventType.trim(), contentId, categoryId, category, topic, source, upvoted, durationSeconds]
    );

    return NextResponse.json({
      success: true,
      interaction_id: r.rows[0].id,
      created_at: r.rows[0].created_at,
    });
  } catch (e) {
    const err = e as { message?: string; code?: string };
    console.error("TRACK ERROR", e);
    return NextResponse.json(
      { success: false, error: err.message ?? "Failed to track event", code: err.code },
      { status: 500 }
    );
  }
}
