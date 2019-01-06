import { observable, flow, action } from 'mobx';

import request from '../services/request';

export enum Status {
  PENDING,
  DONE,
  ERROR,
}

export interface IUserStore {
  addUser: () => void;
  deleteAll: () => void;
  deleteOne: (_id: string) => void;
  fetchUsers: () => void;
  status: Status;
  users: User[];
}

class UserStore implements IUserStore {
  @observable users: User[] = [];
  @observable status: Status = Status.PENDING;

  constructor() {
    this.fetchUsers();
  }

  addUser = flow(
    function*(this: UserStore) {
      this.status = Status.PENDING;
      try {
        yield request('users', {
          method: 'POST',
          body: [{ name: 'Bob' }],
        });
        yield this.fetchUsers();
      } catch (error) {
        this.status = Status.ERROR;
      }
    }.bind(this),
  );

  fetchUsers = flow(
    function*(this: UserStore) {
      this.status = Status.PENDING;
      try {
        this.users = yield request('users');
        this.status = Status.DONE;
      } catch (error) {
        this.status = Status.ERROR;
      }
    }.bind(this),
  );

  deleteAll = flow(
    function*(this: UserStore) {
      this.status = Status.PENDING;
      try {
        yield request('users', {
          method: 'DELETE',
        });
        yield this.fetchUsers();
      } catch (error) {
        this.status = Status.DONE;
      }
    }.bind(this),
  );

  deleteOne = flow(
    function*(this: UserStore, _id: string) {
      this.status = Status.PENDING;
      try {
        yield request(`users?_id=${_id}`, {
          method: 'DELETE',
        });
        yield this.fetchUsers();
      } catch (error) {
        this.status = Status.DONE;
      }
    }.bind(this),
  );
}

export const userStore = new UserStore();
