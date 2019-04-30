import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LockerInstances } from './locker-instances.model';

@Injectable({
  providedIn: 'root'
})
export class LockerInstancesService {
  private lockerInstances: LockerInstances[] = [];

  dataChanged = new Subject<LockerInstances[]>();
  constructor() { }

  getdata() {
    return this.lockerInstances.slice();
  }
  setLockerInstances(lockers: LockerInstances[]) {
  this.lockerInstances = lockers;
  this.dataChanged.next(this.lockerInstances.slice());
  }
}
