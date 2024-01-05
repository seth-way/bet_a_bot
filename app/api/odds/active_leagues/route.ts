// export const runtime = 'edge';
import { type NextRequest } from 'next/server';

const { ODDS_API_KEY } = process.env;

export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const dummyData = require('./results.json');
      return Response.json({ ...dummyData });
    }

    const res: Response = await fetch(
      `https://api.the-odds-api.com/v4/sports?apiKey=${ODDS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.ok) {
      const activeLeagues = await res.json();
      return Response.json({ activeLeagues });
    }
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}
