import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Departure } from './Departure';
import { Status } from '../enums';

type PropsType = {
  departureStore?: IDepartureStore;
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

@inject((rootStore: IRootStore) => ({
  departureStore: rootStore.departureStore,
}))
@observer
export class DepartureList extends Component<PropsType> {
  componentDidMount() {
    const { departureStore } = this.props;
    if (!departureStore) return;
    departureStore.fetchDepartures('stop_area:OIF:SA:8739300');
  }
  render() {
    const { departureStore } = this.props;
    if (!departureStore) return null;
    const { departuresForUi, status } = departureStore;
    return (
      <ListWrapper>
        <Dimmer active={false && status === Status.PENDING}>
          <Loader />
        </Dimmer>
        {departuresForUi.map((departure, index) => (
          <Departure key={index} index={index} departure={departure} />
        ))}
      </ListWrapper>
    );
  }
}
