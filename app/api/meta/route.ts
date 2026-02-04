import { NextRequest } from "next/server";
import { getMetaDescription, isHttpUrl } from "@/lib/meta";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url") ?? "";

    if (!isHttpUrl(url)) {
      return new Response(JSON.stringify({ error: "invalid url" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const text = await getMetaDescription(url);

    return new Response(JSON.stringify({ description: text }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : typeof e === "string" ? e : JSON.stringify(e);

    return new Response(JSON.stringify({ error: message || "error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
