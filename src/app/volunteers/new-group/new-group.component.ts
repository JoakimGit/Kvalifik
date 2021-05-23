import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../entities/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VolunteerGroup} from '../../entities/VolunteerGroup';
import {ActivatedRoute, Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {VolunteerDataService} from '../../services/volunteer-data.service';
import {GroupAction} from '../../store/actions/GroupAction';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  public selectedGroup: VolunteerGroup;
  public groupForm: FormGroup;
  public headerTitle = 'Create New Group';
  public editMode = false;

  public volunteerList: User[];
  public groupVolunteers: User[] = [];

  displayedColumns: string[] = ['Name', 'Role', 'Username', 'addGroup'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<User>();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private router: Router, private ngRedux: NgRedux<any>,
              private volunteerData: VolunteerDataService, private groupAction: GroupAction) { }

  ngOnInit(): void {
    this.editMode = false;
    const id: string = this.route.snapshot.paramMap.get('myId');
    if (id !== null) {
      this.headerTitle = 'Edit Group';
      this.editMode = true;
    }
    this.volunteerList = this.volunteerData.getVolunteers();

    this.ngRedux.select(state => state.groups).subscribe(result => {
      this.selectedGroup = result.groups.find(group => group.id === id);
    });

    if (this.selectedGroup === undefined) {
      this.selectedGroup = new VolunteerGroup();
    }else {
      if (this.selectedGroup.members !== undefined){
        this.groupVolunteers = this.selectedGroup.members;
      }
    }

    this.groupForm = this.formBuilder.group( {
      name: [this.selectedGroup.name, Validators.required]
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.volunteerList;
  }

  onSubmitGroup(): void {
    console.log(this.groupForm);
    if (this.groupForm.valid) {
      this.selectedGroup = this.groupForm.value;
      // add members to seperate list and push to db
      this.selectedGroup.members = this.groupVolunteers;
      console.log(this.selectedGroup);
      if (!this.editMode) {
        this.groupAction.saveGroup(this.selectedGroup);
      } else {
        console.log('We should update');
        this.selectedGroup.id = this.route.snapshot.paramMap.get('myId');
        this.groupAction.updateGroup(this.selectedGroup);
      }
      this.router.navigate(['volunteers']);
    }
  }

  checkUserInGroup(id: string): boolean {
    for (let i = 0; i < this.groupVolunteers.length; i++) {
      if (this.groupVolunteers[i].id === id) {
        return true;
      }
    }
    return false;
  }

  openId(id: string): void {
    console.log('Volunteer id clicked: ' + id);
    this.router.navigate(['volunteers/newVolunteer', {myId: id}]);
  }

  manageGroupVolunteers(event, id): void {
    if (event.target.checked){
      console.log('checked: ' + id);
      for (let i = 0; i < this.volunteerList.length; i++) {
        if (this.volunteerList[i].id === id) {
          if (this.volunteerList[i].groups === undefined) {
            this.volunteerList[i].groups = [];
          }
          // this.volunteerList[i].groups.push(this.selectedGroup.name);
          this.groupVolunteers.push(this.volunteerList[i]);
          break;
        }
      }
    }else {
      console.log('not checked: ' + id);
      for (let i = 0; i < this.groupVolunteers.length; i++) {
        if (this.groupVolunteers[i].id === id) {
          if (this.volunteerList[i].groups === undefined) {
            this.volunteerList[i].groups = [];
          }
          // this.volunteerList[i].groups.splice(this.volunteerList[i].groups.indexOf(this.selectedGroup.name), 1);
          this.groupVolunteers.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.groupVolunteers);
  }
}
