import { SearchStationStore, ISearchStationStore } from './store/searchStation';
import { UserStore, IUserStore } from './store/users';

export interface IAllStores {
  userStore: IUserStore;
  searchStationStore: ISearchStationStore;
}

export const allStores: IAllStores = {
  userStore: new UserStore(),
  searchStationStore: new SearchStationStore(),
};
