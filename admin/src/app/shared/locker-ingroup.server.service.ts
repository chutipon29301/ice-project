import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LockerIngroupService } from './locker-ingroup.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LockerIngroupServerService {

  constructor(private httpClient: HttpClient, private lockerIngroupService: LockerIngroupService) { }
  server = environment.serverURL;

  getlockers(id: number) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.get(this.server +  '/group/' + id, { headers: headers
  })
     .subscribe(
       (res) => {
         this.lockerIngroupService.setLockers(res['lockers']);
       },
       error  => {
         console.log('Error', error);
       }
     );
 }

 addlockertogroup(id: number, lockerID: string) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.post(this.server + '/group/addLockerToGroup', {
    'groupID':  id,
    'lockerID':  lockerID
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getlockers(id);
     },
     error  => {
       console.log('Error', error);
     }
   );
}

deletelocker(lockerID: number, groupId: number) {
  const token = localStorage.getItem('LineToken');
  const options = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token
    }),
    body: {
      lockerID: lockerID,
      groupID: groupId,
    },
  };
  this.httpClient.delete(this.server + '/group/removeLockerFromGroup', options)
  .subscribe(
    (res) => {
      this.getlockers(groupId);
    },
    error  => {
      console.log('Error', error);
    }
  );
 }
}
