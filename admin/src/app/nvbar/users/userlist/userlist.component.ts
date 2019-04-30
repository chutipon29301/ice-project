import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../shared/user.service';
import { UserServerService } from './../../../shared/user.server.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../../../shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  private subscription: Subscription;
  users: User[];
  private addmodal: HTMLElement;
  private spanadd: Element;
  selected_national_id: string;

  constructor(private userService: UserService, private userServerService: UserServerService
    ) { }

  ngOnInit() {
    this.addmodal = document.getElementById('addModal');
    this.spanadd = document.getElementsByClassName('close')[0];
    this.userServerService.getusers();
  this.subscription = this.userService.dataChanged
    .subscribe(
    (users: User[]) => {
      this.users = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].role === 'USER') {
          this.users.push(users[i]);
        }
      }
   }
  );
 }
  openadd(e, id) {
    this.addmodal.style.display = 'block';
    this.selected_national_id = id;
  }
  closeadd(form: NgForm) {
    this.addmodal.style.display = 'none';
    form.resetForm();
    this.selected_national_id = undefined;
  }
  onAdd(form: NgForm) {
    const credits = form.value.credits;
    form.resetForm();
    this.userServerService.addcredits(credits, this.selected_national_id);
    this.addmodal.style.display = 'none';
    this.selected_national_id = undefined;
  }
  OnDestroy() {
    this.subscription.unsubscribe();
  }

}
