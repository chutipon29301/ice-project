import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Location } from './location.model';

@Injectable()
export class LocationService {
  private locations: Location[] = [];

  dataChanged = new Subject<Location[]>();
  constructor() { }

  getdata() {
    return this.locations.slice();
  }
  setLocations(locations: Location[]) {
  this.locations = locations;
  this.dataChanged.next(this.locations.slice());
  }
  removeLocation(index: number) {
  this.locations.splice(index, 1);
  this.dataChanged.next(this.locations.slice());
  }
  addLocation(ob: Location) {
  this.locations.unshift(ob);
  this.dataChanged.next(this.locations.slice());
  }
}
