import { Component, OnInit } from '@angular/core';
import { Locker } from './../../shared/locker.model';
import { Subscription } from 'rxjs/Subscription';
import { LockerServerService } from './../../shared/locker.server.service';
import { LockerService } from './../../shared/locker.service';
import { LocationService } from './../../shared/location.service';
import { Location } from './../../shared/location.model';
import { LocationServerService } from './../../shared/location.server.service';
import { LockersService } from './lockers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  unregistered: Locker[];
  tempRegis: Locker[];
  tempUnregis: Locker[];
  private subscription: Subscription;
  private subscription2: Subscription;
  locationsid: number[];
  constructor(private lockerService: LockerService, private lockerServerService: LockerServerService
    , private locationService: LocationService, private locationServerService: LocationServerService
    , private lockersService: LockersService) { }

  ngOnInit() {
    this.lockerServerService.getlockers();
    this.subscription = this.lockerService.dataChanged
    .subscribe(
    (lockers: Locker[]) => {
      this.tempRegis = [];
      this.tempUnregis = [];
      this.unregistered = [];
      for (let i = 0; i < lockers.length; i++) {
        if ('AVAILABLE' === lockers[i].availability || 'MAINTENANCE' === lockers[i].availability || 'WARNING' === lockers[i].availability) {
          this.tempRegis.push(lockers[i]);
        } else if ('UNREGISTERED' === lockers[i].availability) {
        this.tempUnregis.push(lockers[i]);
      } else {}
    }
    this.unregistered = this.tempUnregis;
    this.lockersService.setLockers(this.tempRegis);
       }
     );
     this.locationServerService.getlocations();
    this.subscription2 = this.locationService.dataChanged.subscribe(
      (locations: Location[]) => {
        this.locationsid = [];
        for (let i = 0; i < locations.length; i++) {
      this.locationsid.push(locations[i].id);
    }
  });
}
  OnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
