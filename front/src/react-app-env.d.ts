/// <reference types="react-scripts" />

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: Object;
}

interface User {
  name: string;
  _id: string;
}

type StatusType = 'Pending' | 'Done' | 'Error';

interface IUserStore {
  addUser: () => void;
  deleteAll: () => void;
  deleteOne: (_id: string) => void;
  fetchUsers: () => void;
  status: StatusType;
  users: User[];
}
interface ISearchResult {
  id: string;
  name: string;
}

interface IDeparture {
  displayInformations: {
    color: string;
    direction: string;
    headsign: string;
    label: string;
  };
  stopDateTime: {
    departureDateTime: string;
  };
}

interface ISearchStationStore {
  error: string;
  query: string;
  results: ISearchResult[];
  search: (query?: string) => void;
  status: StatusType;
}

interface IDepartureStore {
  departures: IDeparture[];
  departuresForUi: IDeparture[];
  fetchDepartures: (stationId: string) => void;
  select: (value: any) => void;
  selectedResult?: ISearchResult;
  stationId: string;
  status: StatusType;
}

interface IRootStore {
  departureStore: IDepartureStore;
  searchStationStore: ISearchStationStore;
  userStore: IUserStore;
}
