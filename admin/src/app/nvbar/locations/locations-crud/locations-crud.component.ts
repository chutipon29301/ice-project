import { Component, OnInit } from '@angular/core';
import { LocationService } from './../../../shared/location.service';
import { LocationServerService } from './../../../shared/location.server.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from './../../../shared/location.model';
import { NgForm } from '@angular/forms';
import LocationPicker from 'location-picker';

@Component({
  selector: 'app-locations-crud',
  templateUrl: './locations-crud.component.html',
  styleUrls: ['./locations-crud.component.css']
})
export class LocationsCrudComponent implements OnInit {

  constructor(private locationService: LocationService, private locationServerService: LocationServerService
    ) { }

  private addmodal: HTMLElement;
  private editmodal: HTMLElement;
  private confirmmodal: HTMLElement;
  private spanadd: Element;
  private spanedit: Element;
  private subscription: Subscription;
  private editId: number;
  private deleteId: number;
  locations: Location[];
  alp: LocationPicker;
  elp: LocationPicker;
  ngOnInit() {
  this.addmodal = document.getElementById('addModal');
  this.editmodal = document.getElementById('editModal');
  this.spanadd = document.getElementsByClassName('close')[0];
  this.spanedit = document.getElementsByClassName('close')[1];
  this.confirmmodal = document.getElementById('confirmModal');
  this.subscription = this.locationService.dataChanged
    .subscribe(
    (locations: Location[]) => {
    this.locations = locations; }
     );
  this.alp = new LocationPicker('amap');
  this.elp = new LocationPicker('emap');
  this.locationServerService.getlocations();
    }

  closeadd(form: NgForm) {
    this.addmodal.style.display = 'none';
    form.resetForm();
  }
  closeedit(form: NgForm) {
    this.editId = undefined;
    this.editmodal.style.display = 'none';
    form.resetForm();
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
    this.elp.setLocation(this.locations[i].lat, this.locations[i].lng);
    // form.controls['lat'].setValue(this.locations[i].lat);
    // form.controls['lng'].setValue(this.locations[i].lng);
    form.controls['image'].setValue(this.locations[i].imageURL);
  }
  openadd(e) {
    this.addmodal.style.display = 'block';
  }



  onAdd(form: NgForm) {
    const dis = form.value.dis;
    const lat = this.alp.getMarkerPosition().lat;
    const lng = this.alp.getMarkerPosition().lng;
    const image = form.value.image;
    this.locationServerService.postlocation(dis, lat, lng, image);
    form.resetForm();
    this.alp.setCurrentPosition();
    this.addmodal.style.display = 'none';
  }
  onConfirm(id: number) {
    this.deleteId = id;
    this.confirmmodal.style.display = 'block';
  }
  onEdit(form: NgForm) {
    const dis = form.value.dis;
    const lat = this.elp.getMarkerPosition().lat;
    const lng = this.elp.getMarkerPosition().lng;
    const image = form.value.image;
    this.locationServerService.patchlocation(this.editId, dis, lat, lng, image);
    form.resetForm();
    this.elp.setCurrentPosition();
    this.editId = undefined;
    this.editmodal.style.display = 'none';
  }
  OnDestroy() {
    this.subscription.unsubscribe();
  }
  cConfirm() {
    this.locationServerService.deletelocation(this.deleteId);
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }
  cCancel() {
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }

}
