import { Component, OnInit } from '@angular/core';
import { LocationService } from './../../../shared/location.service';
import { LocationServerService } from './../../../shared/location.server.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from './../../../shared/location.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-locations-crud',
  templateUrl: './locations-crud.component.html',
  styleUrls: ['./locations-crud.component.css']
})
export class LocationsCrudComponent implements OnInit {

  constructor(private locationService: LocationService, private locationServerService: LocationServerService) { }

  private addmodal: HTMLElement;
  private editmodal: HTMLElement;
  private spanadd: Element;
  private spanedit: Element;
  private subscription: Subscription;
  locations: Location[];
  private editId: number;
  ngOnInit() {
  this.addmodal = document.getElementById('addModal');
  this.editmodal = document.getElementById('editModal');
  this.spanadd = document.getElementsByClassName('close')[0];
  this.spanedit = document.getElementsByClassName('close')[1];
  this.locationServerService.getlocations();
  this.subscription = this.locationService.dataChanged
    .subscribe(
    (locations: Location[]) => {
    this.locations = locations; }
     );
     }

  closeadd(e) {
    this.addmodal.style.display = 'none';
  }
  closeedit(e) {
    this.editId = undefined;
    this.editmodal.style.display = 'none';
  }
  openedit(form: NgForm, id: number) {
    this.editId = id;
    this.editmodal.style.display = 'block';
    let i;
    for (i = 0; i < this.locations.length; i++) {
      if (id === this.locations[i].id) {
        break;
      }}
    form.controls['dis'].setValue(this.locations[i].description);
    form.controls['lat'].setValue(this.locations[i].lat);
    form.controls['lng'].setValue(this.locations[i].lng);
  }
  openadd(e) {
    this.addmodal.style.display = 'block';
  }



  onAdd(form: NgForm) {
    const dis = form.value.dis;
    const lat = form.value.lat;
    const lng = form.value.lng;
    this.locationServerService.postlocation(dis, lat, lng);
    form.resetForm();
    this.addmodal.style.display = 'none';
  }
  onRemove(id: number) {
    this.locationServerService.deletelocation(id);
  }
  onEdit(form: NgForm) {
    const dis = form.value.dis;
    const lat = form.value.lat;
    const lng = form.value.lng;
    this.locationServerService.patchlocation(this.editId, dis, lat, lng);
    form.resetForm();
    this.editId = undefined;
    this.editmodal.style.display = 'none';
  }
  OnDestroy() {
    this.subscription.unsubscribe();
  }

}
