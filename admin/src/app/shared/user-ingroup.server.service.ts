import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { UserIngroupService } from './user-ingroup.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserIngroupServerService {

  constructor(private httpClient: HttpClient, private userIngroupService: UserIngroupService) { }
  server = environment.serverURL;

  getusers(id: number) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
     this.httpClient.get(this.server + '/group/' + id, { headers: headers
    })
      .subscribe(
        (res) => {
          this.userIngroupService.setUsers(res['users']);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  addusertogroup(id: number, nationalID: string) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.post(this.server + '/group/addUserToGroup', {
      'groupID':  id,
      'nationalID':  nationalID
      }, { headers: headers
      })
     .subscribe(
       (res) => {
        this.getusers(id);
       },
       error  => {
         console.log('Error', error);
       }
     );
 }


 deleteuser(nationalId: string, groupId: number) {
  const token = localStorage.getItem('LineToken');
  const options = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token
    }),
    body: {
      nationalID: nationalId,
      groupID: groupId,
    },
  };
  this.httpClient.delete(this.server + '/group/removeUserFromGroup', options)
  .subscribe(
    (res) => {
      this.getusers(groupId);
    },
    error  => {
      console.log('Error', error);
    }
  );
 }
}
