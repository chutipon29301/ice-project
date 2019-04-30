import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileServerService } from './../shared/profile.server.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit {

  constructor(private router: Router, private profileServerService: ProfileServerService) { }
  name: HTMLElement;
  details: HTMLElement;
  img_admin: HTMLElement;

  ngOnInit() {
    this.name = document.getElementById('adname');
    this.details = document.getElementById('addetails');
    this.img_admin = document.getElementById('img_admin');
    this.profileServerService.getprofile().subscribe(
        (res) => {
          this.name.textContent = res['firstName'] + ' ' + res['lastName'];
          this.details.textContent = res['role'];
          this.img_admin.style.backgroundImage = 'url(' + res['profileImage'] + ')';
        },
        error  => {
          console.log('Error', error);
        }
      );

  }
  logout(e) {
    localStorage.removeItem('LineToken');
    this.router.navigate(['/']);
  }

}
