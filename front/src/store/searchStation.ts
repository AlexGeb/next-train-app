import { observable, flow, action } from 'mobx';

import request from '../services/request';

export enum Status {
  PENDING,
  DONE,
  ERROR,
}

export interface ISearchResult {
  name: string;
  externalCode: string;
}

export interface ISearchStationStore {
  search: (query: string) => void;
  select: (value: any) => void;
  status: Status;
  results: ISearchResult[];
  query: string;
  selectedResult: ISearchResult | null;
}

export class SearchStationStore implements ISearchStationStore {
  @observable results: ISearchResult[] = [];
  @observable query: string = '';
  @observable status: Status = Status.PENDING;
  @observable selectedResult: ISearchResult | null = null;

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
