import { Component, OnInit } from '@angular/core';
import { SelectedGroupService } from './../selected-group.service';
import { Subscription } from 'rxjs/Subscription';
import { LockerIngroupService } from './../../../shared/locker-ingroup.service';
import { LockerIngroupServerService } from './../../../shared/locker-ingroup.server.service';
import { Locker } from './../../../shared/locker.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addlockers',
  templateUrl: './addlockers.component.html',
  styleUrls: ['./addlockers.component.css']
})
export class AddlockersComponent implements OnInit {

  constructor(private selectedGroupService: SelectedGroupService, private lockerIngroupService: LockerIngroupService,
    private lockerIngroupServerService: LockerIngroupServerService) { }
  selected_id: number;
  subID: Subscription;
  private addmodal: HTMLElement;
  private spanadd: Element;
  private confirmmodal: HTMLElement;
  private deleteId: number;
  private subscription: Subscription;
  lockers: Locker[];

  ngOnInit() {
    this.addmodal = document.getElementById('addModalLocker');
    this.spanadd = document.getElementsByClassName('close')[0];
    this.confirmmodal = document.getElementById('confirmModalLocker');
    this.subID = this.selectedGroupService.dataChanged.subscribe(
      (id: number) => {
      this.selected_id = id;
      this.lockerIngroupServerService.getlockers(id); }
       );
    this.subscription = this.lockerIngroupService.dataChanged
    .subscribe(
      (lockers: Locker[]) => {
      this.lockers = lockers; }
       );
  }
  closeadd(form: NgForm) {
    this.addmodal.style.display = 'none';
    form.resetForm();
  }

  openaddlocker(e) {
    this.addmodal.style.display = 'block';
  }

  onAdd(form: NgForm) {
    const lockerID = form.value.id;
    this.lockerIngroupServerService.addlockertogroup(this.selected_id, lockerID);
    form.resetForm();
    this.addmodal.style.display = 'none';
  }

  onConfirm(id: number) {
    this.deleteId = id;
    this.confirmmodal.style.display = 'block';
  }

  cConfirm() {
    this.lockerIngroupServerService.deletelocker(this.deleteId, this.selected_id);
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }
  cCancel() {
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }

  OnDestroy() {
    this.subID.unsubscribe();
    this.subscription.unsubscribe();
    }
}

