import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { AppState } from '../store/Store';
import {User} from '../entities/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  saveVolunteer(volunteer: User): Observable<any>{
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/volunteers.json?auth=' + token;

    return this.http.post(url, volunteer, this.getHttpOptions());
    // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  }


  readVolunteers(): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    console.log('Token ' + token);
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/volunteers.json?auth=' + token;

    return this.http.get(url, this.getHttpOptions());
  }

  updateVolunteer(volunteer: User): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/volunteers/' + volunteer.id + '.json?auth=' + token;

    return this.http.patch(url, volunteer, this.getHttpOptions());
  }
}
