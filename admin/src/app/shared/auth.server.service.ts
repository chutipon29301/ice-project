import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisTokenService } from './regis-token.service';
import { Settings } from './settings';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthServerService {

  constructor(private httpClient: HttpClient, private router: Router, private regisTokenService: RegisTokenService) { }
  server = environment.serverURL;
  checkRegisToken(token: string) {
    this.httpClient.post(this.server + '/auth/myToken/line', {
      'lineToken':  token
      })
     .subscribe(
       (res) => {
        console.log(res);
        localStorage.setItem('LineToken', res['token']);
        this.router.navigate(['/admin/lockers']);
       },
       error  => {
        this.regisTokenService.token = token;
         this.router.navigate(['/auth/register']);
         console.log('Error', error);
       }
     );
 }
 checkGuardToken(token: string) {
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  return this.httpClient.get(this.server + '/location', { headers: headers
});
}

checkToken(token: string) {
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.get( this.server + '/location', { headers: headers
 })
   .subscribe(
     (res) => {
      this.router.navigate(['/admin/lockers']);
     },
     error  => {
      window.location.replace(this.server + '/auth/lineLoginPageAdmin');
     }
   );
}

   lineToken(code: string) {
    this.httpClient.post(this.server + '/auth/adminLineToken', {
      'code':  code
      })
     .subscribe(
       (res) => {
        console.log(res);
        this.checkRegisToken(res['idToken']);
       },
       error  => {
         console.log('Error', error);
       }
     );
  }
  register(nationalID: string, firstName: string, lastName: string, phone: string, authenticationID: string) {
    this.httpClient.post(this.server + '/user/registerAdmin', {
      'nationalID': nationalID,
      'firstName': firstName,
      'lastName': lastName,
      'authenticationID': authenticationID,
      'phone': phone
      })
     .subscribe(
       (res) => {
        console.log(res);
        this.checkRegisToken(authenticationID);
       },
       error  => {
         console.log('Error', error);
       }
     );
  }

}
