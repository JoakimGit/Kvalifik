import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../entities/Event';
import { AppState } from '../store/Store';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiService {
  private url: string = 'https://kvalifikdb-default-rtdb.europe-west1.firebasedatabase.app/events/'
  private auth: string = ".json?auth="

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) { 
    super();
  }

  readEvents() {
    console.log("Entered read event function in service");
    const token = this.ngRedux.getState().users.token;
    return this.http.get(this.url+this.auth+token, this.getHttpOptions());
  }

  saveEvent(event: Event) {
    console.log("Entered save event function in service");        
    const token = this.ngRedux.getState().users.token;    
    return this.http.post(this.url+this.auth+token, event, this.getHttpOptions());
  }

  updateEvent(event: Event) {
    console.log("Entered update event function in service");
    const token = this.ngRedux.getState().users.token;
    const url = this.url+event.id+this.auth+token;
    return this.http.put(url, event, this.getHttpOptions());    
  }

  deleteEvent(id: string) {
    console.log("Entered delete event function in service");
    const token = this.ngRedux.getState().users.token;
    const url = this.url+id+this.auth+token;
    return this.http.delete(url, this.getHttpOptions());    
  }
}
