import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {User} from '../entities/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {GroupAction} from '../store/actions/GroupAction';
import {VolunteerGroup} from '../entities/VolunteerGroup';
import {VolunteerDataService} from '../services/volunteer-data.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit, AfterContentInit, AfterViewInit{
  constructor(private router: Router, private volunteerAction: VolunteerActions,
              private groupAction: GroupAction, private volunteerData: VolunteerDataService,
              private ngRedux: NgRedux<AppState>) { }

  public userList: User[] = [];
  public volunteerList: User[] = [];
  public groupList: VolunteerGroup[];

  displayedColumns: string[] = ['Name', 'Role', 'Username', 'Email', 'signUp', 'accDec'];
  displayedColumns2: string[] = ['Name', 'Role', 'Username', 'Email', 'signUp', 'rem'];
  displayedColumns3: string[] = ['groupName', 'memberCount', 'rem'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatPaginator) paginator3: MatPaginator;

  dataSource = new MatTableDataSource<User>(this.userList);
  dataSource2 = new MatTableDataSource<User>();
  dataSource3 = new MatTableDataSource<VolunteerGroup>();
  dataSize;

  ngOnInit(): void {
    // Nedenstående loader ikke ordentligt med paginator så det er rykket til afterContentInit
    // this.volunteerAction.getVolunteers();
    // this.dataSource.paginator = this.paginator;
    //
    // this.ngRedux.select(state => state.users).subscribe(( result => {
    //   this.userList = result.users;
    //   this.dataSource.data = this.userList;
    // }));
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
  }

  ngAfterContentInit(): void {
    this.volunteerAction.getVolunteers();
    this.groupAction.getGroups();

    this.ngRedux.select(state => state.users).subscribe(( result => {
      this.userList = [...result.users];
      this.volunteerList = [...result.users];

      let i = this.userList.length;
      while (i--) {
        if (this.userList[i].isVolunteer) {
          this.userList.splice(i, 1);
        }
      }

      let j = this.volunteerList.length;
      while (j--) {
        if (!this.volunteerList[j].isVolunteer) {
          this.volunteerList.splice(j, 1);
        }
      }

      this.dataSource.data = this.userList;
      this.dataSource2.data = this.volunteerList;
    }));

    this.ngRedux.select(state => state.groups).subscribe((result: any) => {
      this.groupList = [...result.groups];
      this.dataSource3.data = this.groupList;
    });
  }

  accept(id: string): void {
    console.log('Accepted: ' + id);
    for (let i = 0; i < this.userList.length; i++){
      if (this.userList[i].id === id){
        const user = this.userList[i];
        user.isVolunteer = true;
        this.volunteerAction.updateVolunteer(user);
        break;
      }
    }
  }

  decline(id: string): void {
    console.log('Declined: ' + id);
    for (let i = 0; i < this.volunteerList.length; i++){
      if (this.volunteerList[i].id === id){
        const user = this.volunteerList[i];
        user.isVolunteer = false;
        this.volunteerAction.updateVolunteer(user);
        break;
      }
    }
  }

  openId(id: string): void {
    console.log('Volunteer id clicked: ' + id);
    this.router.navigate(['volunteers/newVolunteer', {myId: id}]);
  }

  delGroup(id: string): void {
    console.log('Deleted ' + id);
    this.groupAction.deleteGroup(id);
  }

  openGroupId(id: string): void {
    console.log('Clicked ' + id);
    this.prepareNewGroup();
    this.router.navigate(['volunteers/newGroup', {myId: id}]);
  }

  prepareNewGroup(): void{
    this.volunteerData.setVolunteers(this.volunteerList);
  }
}
