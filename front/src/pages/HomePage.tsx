import React from 'react';
import { Dimmer, Loader, Input, Menu, Container } from 'semantic-ui-react';

import { SearchStations } from '../components/SearchStations';
import { DepartureList } from '../components/DepartureList';

const HomePage = () => (
  <div>
    <Menu>
      <Container>
        <SearchStations />
      </Container>
    </Menu>
    <Container>
      <DepartureList />
    </Container>
  </div>
);

export default HomePage;
