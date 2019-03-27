import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
   // this.Userdata.signinUser(username, password);
  }


}
