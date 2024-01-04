export const runtime = 'edge';

import { kv } from '@vercel/kv';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const selectedLeaguesList = await kv.smembers('selected_leagues');
    return Response.json({ selectedLeaguesList });
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}
