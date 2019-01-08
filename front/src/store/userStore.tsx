import { observable, flow, action } from 'mobx';

import { Status } from '../enums';
import request from '../services/request';

export class UserStore implements IUserStore {
  @observable users: User[] = [];
  @observable status: StatusType = Status.PENDING;

  constructor(rootStore: IRootStore) {
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
