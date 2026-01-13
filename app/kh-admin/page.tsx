// app/kh-admin/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type Totals = {
  total_dwell_seconds: number;
  total_topic_selects: number;
  total_upvotes: number;
};

type RowDwell = { category: string; total_seconds: number; total_minutes: string };
type RowSelect = { category: string; selections: number };
type RowUpvote = { category: string; upvotes: number };

type AnalyticsResponse = {
  success: boolean;
  range: string;
  scope: "global" | "user";
  user_id: string | null;
  totals: Totals;
  dwell_by_category: RowDwell[];
  selects_by_category: RowSelect[];
  upvotes_by_category: RowUpvote[];
};

function fmtTime(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r}s`;
  return `${m}m ${r}s`;
}

export default function KhAdminPage() {
  const [range, setRange] = useState<string>("all"); // all | 7d | 30d | 1d
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const r = await fetch(`/api/kh/analytics?range=${encodeURIComponent(range)}`, {
          cache: "no-store",
        });
        const j = (await r.json()) as AnalyticsResponse;
        if (!alive) return;

        if (!j.success) {
          setErr("API returned success=false");
          setData(null);
          return;
        }
        setData(j);
      } catch (e: unknown) {
        if (e instanceof Error) {
    setErr(e.message);
  } else {
    setErr("Failed to load analytics");
  }
        setData(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [range]);

  const totals = data?.totals;
  const topDwell = useMemo(() => (data?.dwell_by_category ?? []).slice(0, 10), [data]);
  const topSelects = useMemo(() => (data?.selects_by_category ?? []).slice(0, 10), [data]);
  const topUpvotes = useMemo(() => (data?.upvotes_by_category ?? []).slice(0, 10), [data]);

  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Knowledge Hub Analytics</h1>
        <p style={{ marginTop: 0, opacity: 0.75 }}>
          Scope: <b>Global</b> • Endpoint: <code>/api/kh/analytics</code>
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "16px 0 24px" }}>
          <label style={{ fontWeight: 600 }}>Range</label>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="all">All</option>
            <option value="30d">Last 30d</option>
            <option value="7d">Last 7d</option>
            <option value="1d">Last 1d</option>
          </select>
          {loading && <span style={{ opacity: 0.7 }}>Loading…</span>}
          {err && <span style={{ color: "crimson" }}>{err}</span>}
        </div>

        {/* Totals */}
        {totals && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
              <div style={{ opacity: 0.7, fontSize: 12 }}>Total dwell time</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{fmtTime(totals.total_dwell_seconds)}</div>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
              <div style={{ opacity: 0.7, fontSize: 12 }}>Topic selects</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{totals.total_topic_selects}</div>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
              <div style={{ opacity: 0.7, fontSize: 12 }}>Upvotes</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{totals.total_upvotes}</div>
            </div>
          </div>
        )}

        {/* Leaderboards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <Board title="Top categories by dwell time">
            <Table
              headers={["Category", "Time"]}
              rows={topDwell.map((r) => [r.category, fmtTime(r.total_seconds)])}
            />
          </Board>

          <Board title="Top categories by selections">
            <Table headers={["Category", "Selects"]} rows={topSelects.map((r) => [r.category, String(r.selections)])} />
          </Board>

          <Board title="Top categories by upvotes">
            <Table headers={["Category", "Upvotes"]} rows={topUpvotes.map((r) => [r.category, String(r.upvotes)])} />
          </Board>
        </div>
      </div>
    </div>
  );
}

function Board({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: "left", padding: "8px 6px", borderBottom: "1px solid #eee" }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} style={{ padding: 10, opacity: 0.7 }}>
              No data
            </td>
          </tr>
        ) : (
          rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "8px 6px", borderBottom: "1px solid #f3f3f3" }}>
                  {c}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
