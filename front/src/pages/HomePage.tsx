import React from 'react';
import { Box } from '@smooth-ui/core-sc';

import { styles } from '../styles';
import { SearchStations } from '../components/SearchStations';
import { DepartureList } from '../components/DepartureList';

const HomePage = () => (
  <Box height="100vh" backgroundColor="rgb(238, 241, 245)">
    <Box
      alignItems="center"
      display="flex"
      height={50}
      p={`0px ${styles.sidePadding}px`}
    >
      <SearchStations />
    </Box>
    <Box>
      <DepartureList />
    </Box>
  </Box>
);

export default HomePage;
