// export const runtime = 'edge';
import { type NextRequest, NextResponse } from 'next/server';
import { EVENT } from '@/constants';

const { ODDS_API_KEY } = process.env;
// Markets string can include 'h2h', 'spreads', 'totals'
// separated by commas
const MARKETS = 'h2h,spreads';

const getEventsURL = (sport: string) =>
  `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${ODDS_API_KEY}&regions=us&markets=${MARKETS}`;

interface BetRequestBody {
  keys: string[];
}

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const dummyData = require('./results.json');
      return Response.json({  ...dummyData });
    }

    const body = await request.json();
    const { keys } = body;
    if (!keys) throw new Error('Request missing keys array.');
    /*
    // reduce arrays from each separate async 'sport' call to single event array
    const eventReducer = async (
      acc: EVENT[],
      key: string
    ): Promise<EVENT[]> => {
      try {
        const response: Response = await fetch(getEventsURL(key));
        if (response.ok) {
          const events: EVENT[] = await response.json();
          return [...(await acc), ...events];
        }
        return [...(await acc)];
      } catch (error) {
        console.log('Error in fetching events. Some may be missing.');
        return [...(await acc)];
      }
    };

    const allEvents: EVENT[] = await keys.reduce(eventReducer, new Array<EVENT>());
    */
    let remainingRequests: number | null = null;
    // returns 2 dimensional array of arrays of EVENTS
    const events2D: EVENT[][] = await Promise.all(
      keys.map(async (key: string): Promise<any> => {
        const response: Response = await fetch(getEventsURL(key));
        const headerRequestsRemaining = response.headers.get(
          'X-Requests-Remaining'
        );

        remainingRequests = headerRequestsRemaining
          ? parseInt(headerRequestsRemaining)
          : null;

        if (response.ok) {
          const newEvents = (await response.json()) as EVENT[];
          return newEvents;
        }
        return [];
      })
    );
    // flatten 2D array
    const events = events2D.flat();

    return Response.json({ events, remainingRequests });
  } catch (error) {
    console.log('ERROR: ', error);
    return Response.error();
  }
}
