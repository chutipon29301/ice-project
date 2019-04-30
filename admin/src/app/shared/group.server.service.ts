import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { GroupService } from './group.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupServerService {

  constructor(private httpClient: HttpClient, private groupService: GroupService) { }
  server = environment.serverURL;

getgroups() {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   this.httpClient.get(this.server + '/group', { headers: headers
  })
    .subscribe(
      (res) => {
        this.groupService.setGroups(res['groups']);
      },
      error  => {
        console.log('Error', error);
      }
    );
}

postgroup(name: string) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.post(this.server + '/group', {
    'name':  name
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getgroups();
     },
     error  => {
       console.log('Error', error);
     }
   );
}

deletegroup(id: number) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.delete(this.server + '/group/' + id, { headers: headers
})  .subscribe(
  (res) => {
    this.getgroups();
  },
  error  => {
    console.log('Error', error);
  }
);
}

patchgroup(id: number, name: string) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.patch(this.server + '/group/' + id, {
    'name':  name
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getgroups();
     },
     error  => {
       console.log('Error', error);
     }
   );
}


}

