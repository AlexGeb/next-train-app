import { UserStore } from './userStore';
import { SearchStationStore } from './searchStationStore';

export class RootStore implements IRootStore {
  userStore: UserStore;
  searchStationStore: SearchStationStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.searchStationStore = new SearchStationStore(this);
  }
}
