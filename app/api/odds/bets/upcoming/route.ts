// export const runtime = 'edge';
import { type NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { EVENT } from '@/constants';
import { create } from 'domain';

const { ODDS_API_KEY } = process.env;
// Markets string can include 'h2h', 'spreads', 'totals'
// separated by commas
const MARKETS = 'h2h,spreads';

export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const dummyData = require('./results.json');
      return Response.json({ ...dummyData });
    }

    const keys = await kv.smembers('selected_leagues');
    if (!keys)
      throw new Error(
        'No selected sports leagues found.\nCheck connection to DB.'
      );
    // Get upcoming events and their information
    const eventsInfos = await getEventsInformation(keys);
    if (eventsInfos instanceof Error) throw eventsInfos;
    // Get odds for each event
    const oddsResponse = await getEventsOdds(eventsInfos);
    if (oddsResponse instanceof Error) throw oddsResponse;

    const [eventsOdds, remainingRequests] = oddsResponse;
    return NextResponse.json({ eventsOdds, remainingRequests });
  } catch (error) {
    console.log('ERROR: ', error);
    return NextResponse.error();
  }
}
//POST allows a user to include a custom 'keys' array and get
//odds for only those sports
export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const dummyData = require('./results.json');
      return Response.json({ ...dummyData });
    }

    const body = await request.json();
    const keys = body.keys;
    if (!keys) throw new Error('Request missing keys array.');
    // Get upcoming events and their information
    const eventsInfos = await getEventsInformation(keys);
    if (eventsInfos instanceof Error) throw eventsInfos;
    // Get odds for each event
    const oddsResponse = await getEventsOdds(eventsInfos);
    if (oddsResponse instanceof Error) throw oddsResponse;

    const [eventsOdds, remainingRequests] = oddsResponse;
    return NextResponse.json({ eventsOdds, remainingRequests });
  } catch (error) {
    console.log('ERROR: ', error);
    return NextResponse.error();
  }
}

//// HELPERS --> GET INFO FOR UPCOMING EVENTS
const createEventsURL = (sport: string) =>
  `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${ODDS_API_KEY}&regions=us&oddsFormat=american`;
interface IEventInfo {
  id: string;
  sport_key: string;
}

const getEventsInformation = async (
  keys: string[]
): Promise<IEventInfo[] | Error> => {
  try {
    // async reducer that takes a list of sport keys and
    // returns an array of IEventInfo objects
    const eventsReducer = async (acc: Promise<IEventInfo[]>, key: string) => {
      const response: Response = await fetch(createEventsURL(key));

      if (response.ok) {
        const newEvents = (await response.json()) as EVENT[];
        const newEventsInfos = newEvents.map(event => {
          const { id, sport_key } = event;
          return { id, sport_key };
        });
        return [...(await acc), ...newEventsInfos];
      }
      return [...(await acc)];
    };

    return await keys.reduce<Promise<IEventInfo[]>>(
      eventsReducer,
      Promise.resolve([])
    );
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('unknown error while fetching event information');
  }
};

//// HELPERS --> GET ODDS FOR UPCOMING EVENTS
const createOddsURL = (eventID: string, sportKey: string) =>
  `https://api.the-odds-api.com/v4/sports/${sportKey}/events/${eventID}/odds?apiKey=${ODDS_API_KEY}&regions=us&markets=${MARKETS}&oddsFormat=american`;

const getEventsOdds = async (
  eventInfos: IEventInfo[]
): Promise<[any[], number | null] | Error> => {
  let remainingRequests: number | null = null;
  try {
    const odds: any[] = await Promise.all(
      eventInfos.map(async (info: IEventInfo, idx): Promise<any> => {
        const { id, sport_key } = info;
        const response: Response = await fetch(createOddsURL(id, sport_key));

        const headerRequestsRemaining = response.headers.get(
          'X-Requests-Remaining'
        );

        remainingRequests = headerRequestsRemaining
          ? parseInt(headerRequestsRemaining)
          : null;

        if (response.ok) {
          const eventOdds = await response.json();
          return eventOdds;
        }
      })
    );

    return [odds, remainingRequests];
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error('unknown error while fetching event information');
  }
};
