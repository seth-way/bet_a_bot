'use client';
import { useEffect } from 'react';

import ListOfSelectLeagues from './_components/ListOfSelectedLeagues';
import RequestForm from '@/_components/RequestForm';
import ResponseDisplay from '@/_components/ResponseDisplay';

import { Box } from '@mui/material';

import { useSelectedLeagues } from './store/zustand';

export default function Home() {
  const selectedLeaguesStore = useSelectedLeagues();

  const fetchSelectedLeagues = async () => {
    try {
      console.log('sending fetch request');
      const response: Response = await fetch('/api/odds/selected_leagues');
      console.log('received response.');
      console.log('Response: ', response);
      if (response.ok) {
        const { selectedLeaguesList } = await response.json();

        selectedLeaguesList.forEach((leagueKey: string) =>
          useSelectedLeagues.setState(prev => ({
            selectedLeagues: new Set(prev.selectedLeagues).add(leagueKey),
          }))
        );
      }
    } catch (error) {
      console.log('ERROR...... ', error);
      if (error instanceof Error) console.log('*** ', error.message);
    }
  };

  useEffect(() => {
    fetchSelectedLeagues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center p-24'>
      <div className='w-full min-h-full flex flex-row justify-between items-center'>
        <Box className='flex flex-col w-3/12 h-full'>
          <RequestForm />
          <ListOfSelectLeagues />
        </Box>
        <ResponseDisplay />
      </div>
    </main>
  );
}
