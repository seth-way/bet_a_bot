import date from 'date-and-time';

import { EVENT } from '@/constants';

const events: EVENT[] = require('@/api/odds/bets/upcoming/results.json').events;

export const displayCurrent = () => {
  console.log(events[9].bookmakers);
};

// Get custom date obj from event for front-end use
type CustomDate = {
  weekDay: string;
  month: string;
  day: string;
  year: string;
  time: string;
  am_pm: string;
};

const convertDate = (dateString: string): CustomDate => {
  const formattedDate = date.format(
    new Date(dateString),
    'dddd_MMM_D_Y_h:mm_A'
  );

  const [weekDay, month, day, year, time, am_pm] = formattedDate.split('_');

  return { weekDay, month, day, year, time, am_pm };
};
