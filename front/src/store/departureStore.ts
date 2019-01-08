import { observable, flow, action } from 'mobx';

export class DepartureStore implements IDepartureStore {
  @observable stationId: string = '';
  @observable selectedResult?: ISearchResult;

  constructor(rootStore: IRootStore) {}

  @action fetchDepartures = (stationId: string) => {
    this.stationId = stationId;
  };

  @action select = (selectedResult: ISearchResult) => {
    this.selectedResult = selectedResult;
    this.fetchDepartures(this.selectedResult.externalCode);
  };
}
