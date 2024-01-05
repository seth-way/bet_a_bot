// export const runtime = 'edge';

import { kv } from '@vercel/kv';
import { type NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { league_key: string } }
) {
  try {
    const { league_key } = params;
    const test = await kv.sadd('selected_leagues', league_key);
    return Response.json({ path_working: true, league_key });
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { league_key: string } }
) {
  try {
    const { league_key } = params;
    const test = await kv.srem('selected_leagues', league_key);
    return Response.json({ path_working: true, league_key });
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}
