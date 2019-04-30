import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ReportService } from './report.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServerService {

  constructor(private httpClient: HttpClient, private reportService: ReportService) { }
  server = environment.serverURL;

  getreports() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
     this.httpClient.get(this.server + '/report', { headers: headers
    })
      .subscribe(
        (res) => {
          this.reportService.setReports(res['reports']);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  deletereport(id: number) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.delete(this.server + '/report/' + id, { headers: headers
  }) .subscribe(
    (res) => {
      this.getreports();
    },
    error  => {
      console.log('Error', error);
    }
  );
 }

 patchresolved( message: string, lockerID: number, reportID: number) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.patch(this.server + '/report/' + reportID, {
    'message':  message,
    'lockerID':  lockerID,
    'resolved':  true
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getreports();
     },
     error  => {
       console.log('Error', error);
     }
   );
}
}
