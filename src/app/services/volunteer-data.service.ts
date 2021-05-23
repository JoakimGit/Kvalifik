import { Injectable } from '@angular/core';
import {User} from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class VolunteerDataService {
  private volunteerList: User[];

  constructor() { }

  getVolunteers(): User[] {
    return this.volunteerList;
  }

  setVolunteers(volunteers: User[]): void {
    this.volunteerList = [...volunteers];
}
}
