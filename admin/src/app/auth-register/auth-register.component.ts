import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServerService } from './../shared/auth.server.service';
import { Router } from '@angular/router';
import { RegisTokenService } from './../shared/regis-token.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  constructor(private authServerService: AuthServerService, private router: Router, private regisTokenService: RegisTokenService) { }

  ngOnInit() {
  }

  onRegis(form: NgForm) {
    const nationalID = form.value.nationalID;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const phone = form.value.phone;
    const token = this.regisTokenService.token;
    this.authServerService.register(nationalID, firstName, lastName, phone, token);
  }

}
