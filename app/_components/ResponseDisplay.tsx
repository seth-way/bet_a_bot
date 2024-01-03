'use client';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useActiveLeagues } from '@/store/zustand';

export default function ResponseDisplay() {
  const activeLeaguesStore = useActiveLeagues();
  const { activeLeagues } = activeLeaguesStore;
  return (
    <Box
      component='form'
      noValidate
      autoComplete='true'
      className='flex flex-col overflow-auto border border-solid border-amber-400 rounded w-8/12 h-full p-5'
    >
      {activeLeagues.map((league, idx) => (
        <div key={`${league.key}-${idx}`}>
          <Typography variant='h4'>League: {league.title}</Typography>
          <Typography variant='h6'>Key: {league.key}</Typography>
          <Typography variant='body1'>
            Description: {league.description}
          </Typography>
        </div>
      ))}
    </Box>
  );
}
