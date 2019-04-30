import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LocationService } from './location.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationServerService {

  constructor(private httpClient: HttpClient, private locationService: LocationService) { }
  server = environment.serverURL;

  getlocations() {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
     this.httpClient.get(this.server + '/location', { headers: headers
    })
      .subscribe(
        (res) => {
          this.locationService.setLocations(res['locations']);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  postlocation(dis: string, lat: number , lng: number, image: string) {
    const token = localStorage.getItem('LineToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    this.httpClient.post(this.server + '/location', {
      'description':  dis,
      'lat':  lat,
      'lng':  lng,
      'imageURL': image
      }, { headers: headers
      })
     .subscribe(
       (res) => {
        this.getlocations();
       },
       error  => {
         console.log('Error', error);
       }
     );
 }

 deletelocation(id: number) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.delete(this.server + '/location/' + id, { headers: headers
})
  .subscribe(
    (res) => {
      this.getlocations();
    },
    error  => {
      console.log('Error', error);
    }
  );
 }

 patchlocation(id: number, dis: string, lat: number , lng: number, image: string) {
  const token = localStorage.getItem('LineToken');
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  this.httpClient.patch(this.server + '/location/' + id, {
    'description':  dis,
    'lat':  lat,
    'lng':  lng,
    'imageURL': image
    }, { headers: headers
    })
   .subscribe(
     (res) => {
      this.getlocations();
     },
     error  => {
       console.log('Error', error);
     }
   );
}
}

