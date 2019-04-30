import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LockerService } from './locker.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LockerServerService {

  constructor(private httpClient: HttpClient, private lockerService: LockerService) { }
  server = environment.serverURL;

  getlockers() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.get(this.server + '/locker', { headers: headers
  })
     .subscribe(
       (res) => {
         this.lockerService.setLockers(res['lockers']);
       },
       error  => {
         console.log('Error', error);
       }
     );
 }

 postlocker(name: string, number: string , loID: number, id: number) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.post(this.server + '/locker/register/' + id, {
    'name':  name,
    'number':  number,
    'locationID':  loID
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getlockers();
     },
     error  => {
       console.log('Error', error);
     }
   );
}

deletelocker(id: number) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.delete(this.server + '/locker/' + id, { headers: headers
})
  .subscribe(
    (res) => {
      this.getlockers();
    },
    error  => {
      console.log('Error', error);
    }
  );
 }

 patchlocker(name: string, number: string , loID: number, id: number, availability: string) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  console.log(name);
  console.log(number);
  console.log(loID);
  this.httpClient.patch(this.server + '/locker/' + id, {
    'name':  name,
    'number':  number,
    'locationID':  loID,
    'availability': availability
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getlockers();
     },
     error  => {
       console.log('Error', error);
     }
   );
}



}
