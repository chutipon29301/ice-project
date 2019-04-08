import { Component, OnInit } from '@angular/core';
import { Locker } from './../../shared/locker.model';
import { Subscription } from 'rxjs/Subscription';
import { LockerServerService } from './../../shared/locker.server.service';
import { LockerService } from './../../shared/locker.service';
import { LocationService } from './../../shared/location.service';
import { Location } from './../../shared/location.model';
import { LocationServerService } from './../../shared/location.server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private registered: Locker[];
  private unregistered: Locker[];
  private subscription: Subscription;
  private subscription2: Subscription;
  private locationsid: number[];
  constructor(private lockerService: LockerService, private lockerServerService: LockerServerService
    , private locationService: LocationService, private locationServerService: LocationServerService) { }

  ngOnInit() {
    this.lockerServerService.getlockers();
    this.subscription = this.lockerService.dataChanged
    .subscribe(
    (lockers: Locker[]) => {
      this.registered = [];
      this.unregistered = [];
      for (let i = 0; i < lockers.length; i++) {
        if ('AVAILABLE' === lockers[i].availability) {
          this.registered.push(lockers[i]);
        } else if ('UNREGISTERED' === lockers[i].availability) {
        this.unregistered.push(lockers[i]);
      } else {}
    }
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
