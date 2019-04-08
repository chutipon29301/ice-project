import { Component, OnInit, Input } from '@angular/core';
import { Locker } from './../../../shared/locker.model';
import {SelectionModel} from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';
import { LockerServerService } from './../../../shared/locker.server.service';

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})

export class LockersComponent implements OnInit {
  constructor(private lockerServerService: LockerServerService) { }
  @Input() registered: Locker[];
  @Input() locationsid: number[];
   private editId: number;
   modal: HTMLElement;
   span: Element;
  ngOnInit() {
  this.modal = document.getElementById('editModal');
  this.span = document.getElementsByClassName('close')[0];
  }

  closeedit(e) {
    this.modal.style.display = 'none';
    this.editId = undefined;
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
    form.controls['locationID'].setValue(this.registered[i].location.id);
 }
  onEdit(form: NgForm) {
    const name = form.value.name;
    const number = form.value.number;
    const locationID = form.value.locationID;
    this.lockerServerService.patchlocker(name, number, locationID, this.editId);
    form.resetForm();
    this.editId = undefined;
    this.modal.style.display = 'none';
  }

  onRemove(id: number) {
    this.lockerServerService.deletelocker(id);
  }

}
