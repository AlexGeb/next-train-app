import { UserStore } from './userStore';
import { SearchStationStore } from './searchStationStore';
import { DepartureStore } from './departureStore';

export class RootStore implements IRootStore {
  userStore: IUserStore;
  searchStationStore: ISearchStationStore;
  departureStore: IDepartureStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.departureStore = new DepartureStore(this);
    this.searchStationStore = new SearchStationStore(this);
  }
}
