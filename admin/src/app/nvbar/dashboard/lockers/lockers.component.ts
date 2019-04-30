import { Component, OnInit, Input } from '@angular/core';
import { Locker } from './../../../shared/locker.model';
import {SelectionModel} from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';
import { LockerServerService } from './../../../shared/locker.server.service';
import { LockerInstances } from './../../../shared/locker-instances.model';
import { LockerInstancesService } from './../../../shared/locker-instances.service';
import { LockerInstancesServerService } from './../../../shared/locker-instances.server.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})

export class LockersComponent implements OnInit {
  constructor(private lockerServerService: LockerServerService, private lockerInstancesService: LockerInstancesService,
     private lockerInstancesServerService: LockerInstancesServerService) { }
  @Input() registered: Locker[];
  @Input() locationsid: number[];
   private editId: number;
   modal: HTMLElement;
   private confirmmodal: HTMLElement;
   span: Element;
   private deleteId: number;
   private subscription: Subscription;
   lockerInstances: LockerInstances;

  ngOnInit() {
  this.modal = document.getElementById('editModal');
  this.span = document.getElementsByClassName('close')[0];
  this.confirmmodal = document.getElementById('confirmModal');

  this.lockerInstancesServerService.getlockerinstances();
  this.subscription = this.lockerInstancesService.dataChanged
  .subscribe(
  (lockerInstances: LockerInstances[]) => {
  while (this.registered === undefined) {  }
    for (let i = 0; i < lockerInstances.length; i++) {
      for (let j = 0; j < this.registered.length; j++) {
        if (lockerInstances[i].lockerID === this.registered[j].id) {
        this.registered[j].instance = lockerInstances[i];
  }
    }
  }
}
     );
  }

  closeedit(form: NgForm) {
    this.modal.style.display = 'none';
    this.editId = undefined;
    form.resetForm();
  }
  openedit(form: NgForm, id) {
    this.editId = id;
    this.modal.style.display = 'block';
    let i;
    for (i = 0; i < this.registered.length; i++) {
      if (id === this.registered[i].id) {
        break;
      }}
    form.controls['name'].setValue(this.registered[i].name);
    form.controls['number'].setValue(this.registered[i].number);
    if (this.registered[i].location) {form.controls['locationID'].setValue(this.registered[i].location.id); }
    form.controls['availability'].setValue(this.registered[i].availability);
 }
  onEdit(form: NgForm) {
    const name = form.value.name;
    const number = form.value.number;
    const locationID = form.value.locationID;
    const availability = form.value.availability;
    this.lockerServerService.patchlocker(name, number, locationID, this.editId, availability);
    form.resetForm();
    this.editId = undefined;
    this.modal.style.display = 'none';
  }

  onConfirm(id: number) {
    this.deleteId = id;
    this.confirmmodal.style.display = 'block';
  }

  cConfirm() {
    this.lockerServerService.deletelocker(this.deleteId);
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }
  cCancel() {
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }

}
