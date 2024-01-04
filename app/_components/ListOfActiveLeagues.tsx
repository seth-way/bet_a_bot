'use client';
import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { useActiveLeagues, useSelectedLeagues } from '@/store/zustand';

const leagueCSS = 'hover:bg-cyan-950';
const selectedLeagueCSS = 'hover:bg-cyan-900 text-emerald-500';

interface ListProps {}

export default function ListOfActiveLeagues(props: ListProps) {
  const activeLeaguesStore = useActiveLeagues();
  const { activeLeagues } = activeLeaguesStore;

  const selectedLeaguesStore = useSelectedLeagues();
  const { selectedLeagues } = selectedLeaguesStore;

  const selectLeague = async (key: string) => {
    try {
      const response = await fetch(`/api/odds/selected_leagues/${key}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Error adding league:' + key);
      useSelectedLeagues.setState(prev => ({
        selectedLeagues: new Set(prev.selectedLeagues).add(key),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const deselectLeague = async (key: string) => {
    const response = await fetch(`/api/odds/selected_leagues/${key}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error removing league: ' + key);
    useSelectedLeagues.setState(prev => {
      const update = new Set(prev.selectedLeagues);
      update.delete(key);
      return {
        selectedLeagues: update,
      };
    });
  };

  return (
    <Box className='overflow-auto pt-5 pl-5 pr-5 pb-20'>
      {activeLeagues.map((league, idx) => {
        const selected = selectedLeagues.has(league.key);
        return (
          <div
            key={`${league.key}-${idx}`}
            onClick={
              selected
                ? () => deselectLeague(league.key)
                : () => selectLeague(league.key)
            }
            className={`flex flex-col items-center hover:cursor-pointer ${
              selected ? selectedLeagueCSS : leagueCSS
            }`}
          >
            {' '}
            {idx !== 0 && (
              <Divider
                flexItem
                variant='middle'
                sx={{ bgcolor: '#c4b5fd', margin: 2 }}
              />
            )}
            <Typography variant='h4'>League: {league.title}</Typography>
            <Typography variant='h6'>Key: {league.key}</Typography>
            <Typography variant='body1'>
              Description: {league.description}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
}
