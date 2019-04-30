import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { UserService } from './user.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Credits } from './credits.model';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  server = environment.serverURL;

  getusers() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
     this.httpClient.get(this.server + '/user/credit', { headers: headers
    })
      .subscribe(
        (res) => {
          this.userService.setUsers(res['users']);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  addcredits(amount: number, userID: string) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.post(this.server + '/credit-usage/addCredit', {
      'amount':  amount,
      'userID': userID
      }, { headers: headers
      })
     .subscribe(
       (res) => {
        this.getusers();
       },
       error  => {
         console.log('Error', error);
       }
     );
  }
}
