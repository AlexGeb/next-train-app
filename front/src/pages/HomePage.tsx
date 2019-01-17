import React from 'react';
import { Box } from '@smooth-ui/core-sc';

import { SearchStations } from '../components/SearchStations';
import { DepartureList } from '../components/DepartureList';

const HomePage = () => (
  <Box height="100vh" backgroundColor="rgb(238, 241, 245)">
    <SearchStations />
    <DepartureList />
  </Box>
);

export default HomePage;
