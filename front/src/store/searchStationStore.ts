import { observable, flow, action } from 'mobx';

import { Status } from '../enums';
import request from '../services/request';

export class SearchStationStore implements ISearchStationStore {
  @observable results: ISearchResult[] = [];
  @observable query: string = '';
  @observable status: StatusType = Status.PENDING;
  @observable selectedResult: ISearchResult | null = null;

  constructor(rootStore: IRootStore) {}

  search = flow(
    function*(this: SearchStationStore, query: string) {
      this.status = Status.PENDING;
      this.query = query;
      try {
        const results = yield request(`trains?q=${query}`, {
          method: 'GET',
        });
        this.results = results;
        this.status = Status.DONE;
      } catch (error) {
        this.status = Status.DONE;
      }
    }.bind(this),
  );

  @action select = (selectedResult: ISearchResult) =>
    (this.selectedResult = selectedResult);
}
