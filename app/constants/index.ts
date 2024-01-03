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
