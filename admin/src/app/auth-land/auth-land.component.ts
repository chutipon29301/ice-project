import { Component, OnInit } from '@angular/core';
import { AuthServerService } from './../shared/auth.server.service';

@Component({
  selector: 'app-auth-land',
  templateUrl: './auth-land.component.html',
  styleUrls: ['./auth-land.component.css']
})
export class AuthLandComponent implements OnInit {

  constructor(private authServerService: AuthServerService) { }

  ngOnInit() {
    const location = window.location.href;
    const indexOfEqual = location.indexOf('=');
    const code = location.substring(indexOfEqual + 1);
    this.authServerService.lineToken(code);
  }

}
