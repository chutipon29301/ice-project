import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LocationService } from './location.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileServerService {

  constructor(private httpClient: HttpClient) { }
  server = environment.serverURL;
  getprofile() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.httpClient.get(this.server + '/user/profile', { headers: headers } );
  }
}
