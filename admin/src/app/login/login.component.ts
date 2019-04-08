import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServerService } from './../shared/auth.server.service';
import { Router } from '@angular/router';
import { Settings } from './../shared/settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authServerService: AuthServerService) { }
  ngOnInit() {
    if (localStorage.getItem('LineToken')) {
      this.authServerService.checkToken(localStorage.getItem('LineToken'));
    }
  }

  onSignin(form: NgForm) {
    window.location.replace('http://' + Settings.server + '/auth/lineLoginPageAdmin');
  }
}
