import { NextResponse } from "next/server";
import pool from "../lib/db";
;

export async function GET() {
  try {
    const r = await pool.query("SELECT 1 AS ok, NOW() AS now");
    return NextResponse.json({ success: true, data: r.rows[0] });
  } catch (err) {
    const e = err as { message?: string; code?: string };
    return NextResponse.json(
      { success: false, error: e.message || "DB error", code: e.code },
      { status: 500 }
    );
  }
}
