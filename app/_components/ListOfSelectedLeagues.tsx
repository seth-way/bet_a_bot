'use client';
import React, { useState } from 'react';
import { useSelectedLeagues } from '@/store/zustand';
import { Box, Divider, Typography } from '@mui/material';

export default function ListOfSelectedLeagues() {
  const selectedLeaguesStore = useSelectedLeagues();
  const { selectedLeagues } = selectedLeaguesStore;

  return (
    <Box
      component='form'
      noValidate
      autoComplete='true'
      className='flex flex-col items-center p-2 mt-10 border border-solid border-amber-400 rounded w-full'
    >
      <Typography variant='h5' className='text-emerald-600'>
        Selected League Keys
      </Typography>
      <Divider
        flexItem
        variant='middle'
        sx={{ bgcolor: '#c4b5fd', margin: 2 }}
      />
      {Array.from(selectedLeagues).map((leagueKey, idx) => (
        <Typography key={`${leagueKey}-${idx}`} variant='body1'>
          {leagueKey}
        </Typography>
      ))}
    </Box>
  );
}
