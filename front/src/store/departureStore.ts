import { observable, action, flow, toJS, computed } from 'mobx';
import moment from 'moment';

import request from '../services/request';
import { Status } from '../enums';

const departures: IDeparture[] = [
  {
    displayInformations: {
      color: 'red',
      label: 'A',
      direction: 'Paris Saint Lazare',
      headsign: 'TUC',
    },
    stopDateTime: {
      departureDateTime: '20190112T201600',
    },
  },
  {
    displayInformations: {
      color: 'green',
      label: 'B',
      direction: 'Paris Saint Lazare',
      headsign: 'POLO',
    },
    stopDateTime: {
      departureDateTime: '20190112T201600',
    },
  },
];

export class DepartureStore implements IDepartureStore {
  @observable stationId: string = '';
  @observable selectedResult?: ISearchResult;
  @observable departures: IDeparture[] = departures;
  @observable status = Status.DONE;
  @observable error: string | null = null;

  constructor(_: IRootStore) {}

  fetchDepartures = flow(
    function*(this: DepartureStore, stopAreaId: string) {
      this.status = Status.PENDING;
      try {
        const departures = yield request(`trains?stopAreaId=${stopAreaId}`, {
          method: 'GET',
        });
        this.departures = departures;
        this.status = Status.DONE;
      } catch (error) {
        this.status = Status.ERROR;
        this.error = 'Oups ! An error occured..';
      }
    }.bind(this),
  );

  @action select = (selectedResult: ISearchResult) => {
    this.selectedResult = selectedResult;
    this.fetchDepartures(this.selectedResult.id);
  };

  @computed get departuresForUi() {
    return this.departures.map(depart => ({
      ...depart,
      stopDateTime: {
        departureDateTime: moment(depart.stopDateTime.departureDateTime).format(
          'LT',
        ),
      },
    }));
  }
}
