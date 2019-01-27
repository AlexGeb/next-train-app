import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '@material-ui/core/List';

import { Departure } from './Departure';
import { Status } from '../enums';

type PropsType = {
  departureStore?: IDepartureStore;
};

@inject((rootStore: IRootStore) => ({
  departureStore: rootStore.departureStore,
}))
@observer
export class DepartureList extends Component<PropsType> {
  componentDidMount() {
    const { departureStore } = this.props;
    if (!departureStore) return;
    //departureStore.fetchDepartures('stop_area:OIF:SA:8739300');
  }
  render() {
    const { departureStore } = this.props;
    if (!departureStore) return null;
    const { departuresForUi, status } = departureStore;
    return (
      <List>
        {departuresForUi.map((departure, index) => (
          <Departure key={index} index={index} departure={departure} />
        ))}
      </List>
    );
  }
}
