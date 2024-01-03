'use client';
import React, { useState } from 'react';
import { useActiveLeagues } from '@/store/zustand';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { activeLeague } from '@/constants';
import { filterLeaguesByGroup } from '@/utils';

const REQUEST_TYPES = ['get', 'post'];

export default function RequestForm() {
  const activeLeaguesStore = useActiveLeagues();

  const fetchActiveLeagues = async () => {
    try {
      const response: Response = await fetch('/api/activeLeagues');

      if (response.ok) {
        const { activeLeagues } = await response.json();
        const filteredSports = filterLeaguesByGroup(activeLeagues);
        activeLeaguesStore.update(filteredSports);
        console.log('working');
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='true'
      className='flex flex-col p-2 border border-solid border-amber-400 rounded w-3/12'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        border: 'thin solid #ffec80',
      }}
    >
      <FormControl className='my-3'>
        <Button variant='outlined' onClick={fetchActiveLeagues}>
          Get Active Leagues
        </Button>
      </FormControl>
      <FormControl className='my-3'>
        <FormLabel id='request-type-label'>Request Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby='request-type=label'
          name='request-type-group'
        >
          {REQUEST_TYPES.map((type, idx) => (
            <FormControlLabel
              value={type}
              control={<Radio />}
              label={type}
              key={`${idx}-${type}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
