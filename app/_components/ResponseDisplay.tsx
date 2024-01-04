'use client';
import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import ListOfActiveLeagues from './ListOfActiveLeagues';

export default function ResponseDisplay() {
  const [contentType, setType] = React.useState('active_leagues');

  return (
    <Box
      component='form'
      noValidate
      autoComplete='true'
      className='relative flex flex-col border border-solid border-amber-400 rounded w-8/12 h-full'
    >
      {/* Load content based on user selection */}
      {contentType === 'active_leagues' && <ListOfActiveLeagues />}
      <Paper
        className='rounded'
        sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          showLabels
          className='rounded'
          value={contentType}
          onChange={(event, newType) => {
            console.log('new type: ', newType);
            setType(newType);
          }}
        >
          <BottomNavigationAction
            label='Active Leagues'
            value='active_leagues'
          />
          <BottomNavigationAction
            label='Potential Bets'
            value='potential_bets'
          />
          <BottomNavigationAction label='Nearby' />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
