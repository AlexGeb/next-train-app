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
  name: string;
  externalCode: string;
}

interface ISearchStationStore {
  search: (query: string) => void;
  status: StatusType;
  results: ISearchResult[];
  query: string;
  error: string;
}

interface IDepartureStore {
  stationId: string;
  select: (value: any) => void;
  fetchDepartures: (stationId: string) => void;
}

interface IRootStore {
  userStore: IUserStore;
  searchStationStore: ISearchStationStore;
  departureStore: IDepartureStore;
}
