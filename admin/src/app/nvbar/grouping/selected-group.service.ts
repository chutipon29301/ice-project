import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SelectedGroupService {
  public id: number;
  dataChanged = new Subject<number>();
  constructor() { }

  getdata() {
    return this.id;
  }
  setID(id: number) {
  this.id = id;
  this.dataChanged.next(this.id);
  }
}
