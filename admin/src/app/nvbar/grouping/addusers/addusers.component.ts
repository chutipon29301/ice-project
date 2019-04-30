import { Component, OnInit } from '@angular/core';
import { SelectedGroupService } from './../selected-group.service';
import { Subscription } from 'rxjs/Subscription';
import { UserIngroupService } from './../../../shared/user-ingroup.service';
import { UserIngroupServerService } from './../../../shared/user-ingroup.server.service';
import { User } from './../../../shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  constructor(private selectedGroupService: SelectedGroupService, private userIngroupService: UserIngroupService,
    private userIngroupServerService: UserIngroupServerService) { }
  selected_id: number;
  subID: Subscription;
  private addmodal: HTMLElement;
  private spanadd: Element;
  private confirmmodal: HTMLElement;
  private deleteId: string;
  private subscription: Subscription;
  users: User[];

  ngOnInit() {
    this.addmodal = document.getElementById('addModalUser');
    this.spanadd = document.getElementsByClassName('close')[0];
    this.confirmmodal = document.getElementById('confirmModalUser');
    this.subID = this.selectedGroupService.dataChanged.subscribe(
      (id: number) => {
      this.selected_id = id;
      this.userIngroupServerService.getusers(id); }
       );
    this.subscription = this.userIngroupService.dataChanged
    .subscribe(
      (users: User[]) => {
      this.users = users; }
       );
  }
  closeadd(form: NgForm) {
    this.addmodal.style.display = 'none';
    form.resetForm();
  }

  openadduser(e) {
    this.addmodal.style.display = 'block';
  }

  onAdd(form: NgForm) {
    const nationalId = form.value.id;
    this.userIngroupServerService.addusertogroup(this.selected_id, nationalId);
    form.resetForm();
    this.addmodal.style.display = 'none';
  }

  onConfirm(id: string) {
    this.deleteId = id;
    this.confirmmodal.style.display = 'block';
  }

  cConfirm() {
    this.userIngroupServerService.deleteuser(this.deleteId, this.selected_id);
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
