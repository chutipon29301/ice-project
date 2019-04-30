import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Locker } from './../../shared/locker.model';

@Injectable({
  providedIn: 'root'
})
export class LockersService {
  private lockers: Locker[] = [];
  dataChanged = new Subject<Locker[]>();
  constructor() { }

  getdata() {
    return this.lockers.slice();
  }
  setLockers(lockers: Locker[]) {
  this.lockers = lockers;
  this.dataChanged.next(this.lockers.slice());
  }
}
