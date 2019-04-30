import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LockerInstancesService } from './locker-instances.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LockerInstancesServerService {

  constructor(private httpClient: HttpClient, private lockerInstancesService: LockerInstancesService) { }
  server = environment.serverURL;

  getlockerinstances() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.get(this.server +  '/locker-instance/inUsedLockers', { headers: headers
  })
     .subscribe(
       (res) => {
         this.lockerInstancesService.setLockerInstances(res['lockerInstances']);
       },
       error  => {
         console.log('Error', error);
       }
     );
 }
}
