import { Component, OnInit, Input  } from '@angular/core';
import { Locker } from './../../../shared/locker.model';
import { NgForm } from '@angular/forms';
import { LockerServerService } from './../../../shared/locker.server.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private lockerServerService: LockerServerService) { }

  modal: HTMLElement;
  span: Element;
  private id: number;
@Input() unregistered: Locker[];
@Input() locationsid: number[];
 ngOnInit() {
 this.modal = document.getElementById('addModal');
 this.span = document.getElementsByClassName('close')[0];
 }

 closeadd(form: NgForm) {
   this.modal.style.display = 'none';
   this.id = undefined;
   form.resetForm();
 }
 openadd(form: NgForm, id) {
   this.modal.style.display = 'block';
   this.id = id;
 }

 onAdd(form: NgForm) {
  const name = form.value.name;
  const locationID = form.value.locationID;
  const number = form.value.number;
  this.lockerServerService.postlocker(name, number, locationID, this.id);
  form.resetForm();
  this.modal.style.display = 'none';
  this.id = undefined;
}


}
