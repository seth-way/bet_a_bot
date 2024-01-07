//// LISTS USED FOR FILTERING BETS
// list of sports groups that we want to use for bets
export const SELECTED_LEAGUE_GROUPS = [
  'American Football',
  'Basketball',
  'Boxing',
  'Golf',
  'Ice Hockey',
  'Soccer',
];

// league object returned when fetching active sports
export type activeLeague = {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
};

// types making up the EVENT type returned when 
//requesting upcoming bets
export type OUTCOME = {
  name: string;
  price: number;
  point?: number;
  description?: string;
};

export type MARKET = {
  key: string;
  last_update: string;
  outcomes: OUTCOME[];
};

export type BOOKMAKER = {
  key: string;
  title: string;
  last_update: string;
  markets: MARKET[];
};

export type EVENT = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: BOOKMAKER[];
};
