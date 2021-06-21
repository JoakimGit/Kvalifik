import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-form-control',
  templateUrl: './test-form-control.component.html',
  styleUrls: ['./test-form-control.component.scss']
})
export class TestFormControlComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-z]+$'), Validators.minLength(3)]],
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-z]+$')]),
    // firstName: new FormControl('', Validators.required),
    // lastName: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Test form submitted with: ' + JSON.stringify(this.profileForm.value));
  }

  get firstName(): AbstractControl { return this.profileForm.get('firstName'); }
  get lastName(): AbstractControl { return this.profileForm.get('lastName'); }
}
