import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {User} from '../entities/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UserActions} from '../store/actions/UserActions';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit, AfterContentInit, AfterViewInit{
  constructor(private router: Router, private volunteerAction: VolunteerActions, private ngRedux: NgRedux<AppState>) { }
  // testUser: User = {id: 'test', firstName: 'TestFirst', lastName: 'TestLast', role: 'admin',
  //   username: 'testUser', email: 'testMail', signupDate: new Date(), isVolunteer: true};
  public userList: User[] = [];
  public volunteerList: User[] = [];

  displayedColumns: string[] = ['First name', 'Last name', 'Role', 'Username', 'Email', 'signUp', 'accDec'];
  displayedColumns2: string[] = ['First name', 'Last name', 'Role', 'Username', 'Email', 'signUp'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  dataSource = new MatTableDataSource<User>(this.userList);
  dataSource2 = new MatTableDataSource<User>();

  ngOnInit(): void {
    // Nedenstående loader ikke ordentligt med paginator så det er rykket til afterInit
    // this.volunteerAction.getVolunteers();
    // this.dataSource.paginator = this.paginator;
    //
    // this.ngRedux.select(state => state.users).subscribe(( result => {
    //   this.userList = result.users;
    //   this.dataSource.data = this.userList;
    // }));
  }
  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    this.volunteerAction.getVolunteers();
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;

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
  }

  accept(id: string): void {
    console.log('Accepted: ' + id);
  }

  decline(id: string): void {
    console.log('Declined: ' + id);
  }

}
