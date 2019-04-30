import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Group } from './group.model';

@Injectable()
export class GroupService {
  private group: Group[] = [];

  dataChanged = new Subject<Group[]>();
  constructor() { }

  getdata() {
    return this.group.slice();
  }
  setGroups(group: Group[]) {
  this.group = group;
  this.dataChanged.next(this.group.slice());
  }
  removeGroup(index: number) {
  this.group.splice(index, 1);
  this.dataChanged.next(this.group.slice());
  }
  addGroup(ob: Group) {
  this.group.unshift(ob);
  this.dataChanged.next(this.group.slice());
  }
}
