import { SELECTED_LEAGUE_GROUPS, activeLeague } from '@/constants';

// function to filter active sports array by GROUPS selected in constants file
export const filterLeaguesByGroup = (activeLeagues: activeLeague[]) =>
  activeLeagues.filter(league => SELECTED_LEAGUE_GROUPS.includes(league.group));

// function to filter active sports array by KEYS selected in constants file
export const filterLeaguesByKey = (activeLeagues: activeLeague[]) =>
  activeLeagues.filter(league => SELECTED_LEAGUE_GROUPS.includes(league.group));
