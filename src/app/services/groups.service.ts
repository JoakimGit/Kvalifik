import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {VolunteerGroup} from '../entities/VolunteerGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends ApiService{

  constructor(private httpClient: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  readGroups(): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/groups.json?auth=' + token;
    return this.httpClient.get(url, this.getHttpOptions());
  }

  saveGroup(group: VolunteerGroup): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/groups.json?auth=' + token;
    return this.httpClient.post(url, group, this.getHttpOptions());
  }

  updateGroup(group: VolunteerGroup): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/groups/' + group.id + '.json?auth=' + token;
    return this.httpClient.patch(url, group, this.getHttpOptions());
  }

  deleteGroup(id: string): Observable<any> {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/groups/' + id + '.json?auth=' + token;
    return this.httpClient.delete(url, this.getHttpOptions());
  }
}
