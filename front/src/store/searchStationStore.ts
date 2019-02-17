import { observable, flow } from 'mobx';

import { Status } from '../enums';
import request from '../services/request';

export class SearchStationStore implements ISearchStationStore {
  @observable results: ISearchResult[] = [];
  @observable status: StatusType = Status.DONE;
  @observable error: string = '';

  constructor(rootStore: IRootStore) {}

  search = flow(
    function*(this: SearchStationStore, query: string = '') {
      if (query.length < 3) return;
      this.status = Status.PENDING;
      try {
        const results = yield request(`trains?q=${query}`, {
          method: 'GET',
        });
        this.results = results;
        this.status = Status.DONE;
      } catch (error) {
        this.status = Status.ERROR;
        this.error = 'Oups ! An error occured..';
      }
    }.bind(this),
  );
}
