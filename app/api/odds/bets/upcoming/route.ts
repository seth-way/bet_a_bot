export const runtime = 'edge';

import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}
