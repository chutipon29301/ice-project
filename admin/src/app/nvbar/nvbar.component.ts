import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout(e) {
    localStorage.removeItem('LineToken');
    this.router.navigate(['/']);
  }

}
