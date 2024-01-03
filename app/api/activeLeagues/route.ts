const { ODDS_API_KEY } = process.env;

export async function GET(request: Request) {
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
}
