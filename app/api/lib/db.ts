// app/api/lib/db.ts
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}

const isProd = process.env.NODE_ENV === "production";

const pool =
  global.__pgPool ??
  new Pool({
    connectionString,
    ssl: isProd ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (!isProd) global.__pgPool = pool;

export default pool;
