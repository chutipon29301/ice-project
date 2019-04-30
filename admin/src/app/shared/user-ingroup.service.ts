import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserIngroupService {
  private user: User[] = [];

  dataChanged = new Subject<User[]>();
  constructor() { }

  getdata() {
    return this.user.slice();
  }
  setUsers(user: User[]) {
  this.user = user;
  this.dataChanged.next(this.user.slice());
  }
  removeUser(index: number) {
  this.user.splice(index, 1);
  this.dataChanged.next(this.user.slice());
  }
  addUser(ob: User) {
  this.user.unshift(ob);
  this.dataChanged.next(this.user.slice());
  }
}
