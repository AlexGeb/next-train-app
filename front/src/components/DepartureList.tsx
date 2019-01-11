import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import { Departure } from './Departure';
import { Status } from '../enums';

type PropsType = {
  departureStore?: IDepartureStore;
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

@inject((rootStore: IRootStore) => ({
  departureStore: rootStore.departureStore,
}))
@observer
export class DepartureList extends Component<PropsType> {
  render() {
    const { departureStore } = this.props;
    if (!departureStore) return null;
    const { departures, status } = departureStore;
    if (status === Status.PENDING) {
      return <div>loading..</div>;
    }
    return (
      <ListWrapper>
        {departures.map((departure, index) => (
          <Departure
            key={departure.stopDateTime.departureDateTime}
            index={index}
            departure={departure}
          />
        ))}
      </ListWrapper>
    );
  }
}
