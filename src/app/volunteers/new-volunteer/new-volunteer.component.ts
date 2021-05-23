import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VolunteerActions} from '../../store/actions/VolunteerActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../store/Store';

import {User} from '../../entities/User';

@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.scss']
})
export class NewVolunteerComponent implements OnInit {
  public selectedVolunteer: User;
  public selectedRole: string;
  public volunteerForm: FormGroup;
  public headerTitle = 'Create New Volunteer';
  public editMode = false;

  roles: string[] = ['student', 'admin', 'moderator'];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
              private volunteerAction: VolunteerActions, private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    console.log(id);
    if (id !== null) {
      this.headerTitle = 'Edit Volunteer';
      this.editMode = true;
    }

    this.ngRedux.select(state => state.users).subscribe((result: any) => {
      this.selectedVolunteer = result.users.find(user => user.id === id);
    });

    if (this.selectedVolunteer === undefined) {
      this.selectedVolunteer = new User();
    }

    this.volunteerForm = this.formBuilder.group( {
      firstName: [this.selectedVolunteer.firstName, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      lastName: [this.selectedVolunteer.lastName, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      role: [this.selectedVolunteer.role],
      username: [this.selectedVolunteer.username, Validators.required],
      email: [this.selectedVolunteer.email, [Validators.required, Validators.email]],
    });
  }

  onSubmitVolunteer(): void {
    if (this.selectedRole !== undefined) {
      this.volunteerForm.value.role = this.selectedRole;
      console.log(this.volunteerForm);
      if (this.volunteerForm.valid) {
        if (!this.editMode) {
          this.selectedVolunteer = this.volunteerForm.value;
          this.selectedVolunteer.signupDate = new Date();
          this.selectedVolunteer.isVolunteer = false;
          this.selectedVolunteer.role = this.selectedRole;
          console.log(this.selectedVolunteer);
          this.volunteerAction.saveVolunteer(this.selectedVolunteer);
        } else {
          console.log('We should update');
        }
        this.router.navigate(['volunteers']);
      }
    }
  }

}
