import React from 'react';
import { Box } from '@smooth-ui/core-sc';
import { SearchStations } from '../components/SearchStations';

const HomePage = () => (
  <Box>
    <Box
      display="flex"
      justifyContent="space-between"
      p={10}
      backgroundColor="rgb(238, 241, 245)"
    >
      <SearchStations />
    </Box>
    <Box p={10}>List of next departures</Box>
  </Box>
);

export default HomePage;
