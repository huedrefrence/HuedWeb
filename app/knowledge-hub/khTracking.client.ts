// app/knowledge-hub/khTracking.client.ts
"use client";

type TrackPayload = {
  event_type: "topic_select" | "dwell" | "upvote" | string;

  category?: string | null;
  topic?: string | null;

  content_id?: string | null;
  upvoted?: boolean | null;
  duration_seconds?: number | null;

  // allow extra fields without `any`
  [key: string]: string | number | boolean | null | undefined;
};



const LS_USER = "kh_user_id";
const LS_SESSION = "kh_session_id";

function isUuid(v: unknown): v is string {
  return (
    typeof v === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
  );
}

export async function ensureUserId(): Promise<string> {
  const existing = localStorage.getItem(LS_USER);
  if (isUuid(existing)) return existing;

  const r = await fetch("/api/kh/user", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });

  const data = await r.json().catch(() => null);
  const id = data?.user_id;

  if (!r.ok || !isUuid(id)) {
    throw new Error(`ensureUserId failed: ${r.status} ${JSON.stringify(data)}`);
  }

  localStorage.setItem(LS_USER, id);
  return id;
}

export async function ensureSessionId(userId: string): Promise<string> {
  const existing = localStorage.getItem(LS_SESSION);
  if (isUuid(existing)) return existing;

  const r = await fetch("/api/kh/session/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  const data = await r.json().catch(() => null);
  const sid = data?.session_id;

  if (!r.ok || !isUuid(sid)) {
    throw new Error(`ensureSessionId failed: ${r.status} ${JSON.stringify(data)}`);
  }

  localStorage.setItem(LS_SESSION, sid);
  return sid;
}

async function getIds(): Promise<{ userId: string; sessionId: string }> {
  const userId = await ensureUserId();
  const sessionId = await ensureSessionId(userId);
  return { userId, sessionId };
}

export async function track(payload: TrackPayload): Promise<void> {
  try {
    const { userId, sessionId } = await getIds();

    const body: TrackPayload & { user_id: string; session_id: string; category: string; topic: string } = {
      user_id: userId,
      session_id: sessionId,

      ...payload,

      // hard guarantee for DB not-null
      category: payload.category ?? payload.topic ?? "UNKNOWN",
      topic: payload.topic ?? payload.category ?? "UNKNOWN",
    };

    const r = await fetch("/api/kh/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const data = await r.text().catch(() => "");
      console.error("TRACK FAILED", r.status, data, body);
    }
  } catch (e) {
    console.error("TRACK ERROR", e, payload);
  }
}

// sendBeacon tracking (for unload)
export function trackBeacon(payload: TrackPayload): void {
  try {
    const userId = localStorage.getItem(LS_USER);
    const sessionId = localStorage.getItem(LS_SESSION);

    if (!isUuid(userId) || !isUuid(sessionId)) return;

    const body = JSON.stringify({
      user_id: userId,
      session_id: sessionId,
      ...payload,
    });

    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/kh/track", blob);
  } catch {
    // never break unload
  }
}

export function endSessionBeacon(): void {
  try {
    const sessionId = localStorage.getItem(LS_SESSION);
    if (!isUuid(sessionId)) return;

    const body = JSON.stringify({ session_id: sessionId });
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/kh/session/end", blob);

    // optional: clear session so next visit creates a new one
    localStorage.removeItem(LS_SESSION);
  } catch {
    // never break unload
  }
}
