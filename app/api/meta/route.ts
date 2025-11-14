import { NextRequest } from 'next/server';
import { getMetaDescription, isHttpUrl } from '@/lib/meta';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url') || '';
    if (!isHttpUrl(url)) {
      return new Response(JSON.stringify({ error: 'invalid url' }), { status: 400 });
    }
    const text = await getMetaDescription(url);
    return new Response(JSON.stringify({ description: text }), { headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e || 'error') }), { status: 500 });
  }
}

