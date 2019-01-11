import { observable, action } from 'mobx';

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
      departureDateTime: '10:23',
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
      departureDateTime: '10:30',
    },
  },
];

export class DepartureStore implements IDepartureStore {
  @observable stationId: string = '';
  @observable selectedResult?: ISearchResult;
  @observable departures: IDeparture[] = departures;
  @observable status = Status.DONE;

  constructor(rootStore: IRootStore) {}

  @action fetchDepartures = (stationId: string) => {
    this.stationId = stationId;
    this.status = Status.PENDING;
    setTimeout(() => {
      this.status = Status.DONE;
      this.departures = departures;
    }, 2000);
  };

  @action select = (selectedResult: ISearchResult) => {
    this.selectedResult = selectedResult;
    this.fetchDepartures(this.selectedResult.externalCode);
  };
}
