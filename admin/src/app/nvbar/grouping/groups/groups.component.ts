import { Component, OnInit } from '@angular/core';
import { Group } from './../../../shared/group.model';
import { SelectedGroupService } from './../selected-group.service';
import { Subscription } from 'rxjs/Subscription';
import { GroupService } from './../../../shared/group.service';
import { GroupServerService } from './../../../shared/group.server.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[];
  selected_id: number;

  constructor(private selectedGroupService: SelectedGroupService,
     private groupService: GroupService, private groupServerService: GroupServerService) { }

  private addmodal: HTMLElement;
  private editmodal: HTMLElement;
  private spanadd: Element;
  private spanedit: Element;
  private confirmmodal: HTMLElement;
  private subscription: Subscription;
  private editId: number;
  private deleteId: number;

  ngOnInit() {
    this.addmodal = document.getElementById('addModal');
    this.editmodal = document.getElementById('editModal');
    this.spanadd = document.getElementsByClassName('close')[0];
    this.spanedit = document.getElementsByClassName('close')[1];
    this.confirmmodal = document.getElementById('confirmModal');
    this.groupServerService.getgroups();
    this.subscription = this.groupService.dataChanged
      .subscribe(
      (groups: Group[]) => {
      this.groups = groups; }
       );
  }

  itemclick(id: number, e) {
    this.selectedGroupService.setID(id);
    this.selected_id = id;
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
  openedit(form: NgForm, id: number, e) {
    e.stopPropagation();
    this.editId = id;
    this.editmodal.style.display = 'block';
    let i;
    for (i = 0; i < this.groups.length; i++) {
      if (id === this.groups[i].id) {
        break;
      }}
    form.controls['name'].setValue(this.groups[i].name);
  }
  openadd(e) {
    this.addmodal.style.display = 'block';
  }

  onAdd(form: NgForm) {
    const name = form.value.name;
    this.groupServerService.postgroup(name);
    form.resetForm();
    this.addmodal.style.display = 'none';
  }
  onConfirm(id: number, e) {
    e.stopPropagation();
    this.deleteId = id;
    this.confirmmodal.style.display = 'block';
  }
  onEdit(form: NgForm) {
    const name = form.value.name;
    this.groupServerService.patchgroup(this.editId, name);
    form.resetForm();
    this.editId = undefined;
    this.editmodal.style.display = 'none';
  }
  OnDestroy() {
    this.subscription.unsubscribe();
  }
  cConfirm() {
    this.groupServerService.deletegroup(this.deleteId);
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }
  cCancel() {
    this.deleteId = undefined;
    this.confirmmodal.style.display = 'none';
  }


}
