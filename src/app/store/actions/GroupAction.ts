import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../Store';
import {GroupsService} from '../../services/groups.service';
import {VolunteerGroup} from '../../entities/VolunteerGroup';

@Injectable({providedIn: 'root'})
export class GroupAction {
  static READ_GROUPS = 'READ_GROUPS';
  static SAVE_GROUP = 'SAVE_GROUP';
  static UPDATE_GROUP = 'UPDATE_GROUP';
  static DELETE_GROUP = 'DELETE_GROUP';

  constructor(private ngRedux: NgRedux<AppState>, private groupService: GroupsService) {}

  getGroups(): void {
    this.groupService.readGroups().subscribe((result: any) => {
      console.log('result from group server');
      console.log(result);

      const groups: VolunteerGroup[] = [];
      for (const id in result) {
        console.log(id);
        const groupObj = result[id];
        groupObj.id = id;

        groups.push(groupObj);
      }

      this.ngRedux.dispatch({
        type: GroupAction.READ_GROUPS,
        payload: groups
      });
    });
  }

  saveGroup(group: VolunteerGroup): void {
    this.groupService.saveGroup(group).subscribe(( result: any) => {
      console.log('Saved group: ' + result);

      group.id = result.name;
      this.ngRedux.dispatch({
        type: GroupAction.SAVE_GROUP,
        payload: group
      });
    });
  }

  updateGroup(group: VolunteerGroup): void {
    this.groupService.updateGroup(group).subscribe((result: any) => {
      console.log('Updated group: ' + result);

      this.ngRedux.dispatch({
        type: GroupAction.UPDATE_GROUP,
        payload: group
      });
    });
  }

  deleteGroup(id: string): void {
    this.groupService.deleteGroup(id).subscribe((result: any) => {
      console.log('Deleted group: ' + result);

      this.ngRedux.dispatch( {
        type: GroupAction.DELETE_GROUP,
        payload: id
      });
    });
  }
}
