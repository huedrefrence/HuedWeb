import { NextResponse } from "next/server";
import pool from "../lib/db";

export async function GET() {
  try {
    const r = await pool.query("SELECT 1 AS ok, NOW() AS now");
    return NextResponse.json({ success: true, data: r.rows[0] });
  } catch (err: any) {
    console.error("DB TEST ERROR:", err); // 👈 REQUIRED

    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code,
      },
      { status: 500 }
    );
  }
}
