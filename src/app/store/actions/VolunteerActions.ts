import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../Store';
import {VolunteersService} from '../../volunteers.service';
import {User} from '../../entities/User';

@Injectable({ providedIn: 'root'})
export class VolunteerActions {
  static ADD_VOLUNTEER = 'ADD_VOLUNTEER';
  static READ_VOLUNTEERS = 'READ_VOLUNTEERS';
  constructor(private ngRedux: NgRedux<AppState>, private volunteerService: VolunteersService)
  {}

  getVolunteers(): void{
    this.volunteerService.readVolunteers().subscribe((result: any) => {
      console.log('result from server');
      console.log(result);

      const users: User[] = [];
      for (const id in result) {
        console.log(id);
        const userObj = result[id];
        userObj.id = id;

        users.push(userObj as User);
      }

      this.ngRedux.dispatch({
        type: VolunteerActions.READ_VOLUNTEERS,
        payload: users
      });
    });
  }

  saveVolunteer(volunteer: User): void{
    this.volunteerService.saveVolunteer(volunteer).subscribe((result: any) => {
      console.log('Saved ' + result);

      volunteer.id = result.name;
      this.ngRedux.dispatch({
        type: VolunteerActions.ADD_VOLUNTEER,
        payload: volunteer
      });
    });
  }
}
