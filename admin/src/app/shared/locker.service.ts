import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Locker } from './locker.model';

@Injectable()
export class LockerService {
  private lockers: Locker[] = [];

  dataChanged = new Subject<Locker[]>();
  constructor() { }

  getdata() {
    return this.lockers.slice();
  }
  setLockers(lockers) {
  this.lockers = lockers;
  this.dataChanged.next(this.lockers.slice());
  }
  removeLocker(index: number) {
  this.lockers.splice(index, 1);
  this.dataChanged.next(this.lockers.slice());
  }
  addLocker(ob: Locker) {
  this.lockers.unshift(ob);
  this.dataChanged.next(this.lockers.slice());
  }
}
