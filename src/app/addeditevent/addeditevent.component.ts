import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../entities/Event';
import { EventActions } from '../store/actions/EventActions';
import { AppState } from '../store/Store';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addeditevent',
  templateUrl: './addeditevent.component.html',
  styleUrls: ['./addeditevent.component.scss']
})
export class AddediteventComponent implements OnInit {
  public eventForm: FormGroup;
  public isAddMode: boolean;
  public selectedEvent: Event;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private eventActions: EventActions,
    private ngRedux: NgRedux<AppState>
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.isAddMode = !id;

    console.log(id);
    

    this.ngRedux.select(state => state.events).subscribe(res => {
      this.selectedEvent = res.events.find(event => event.id === id);
    });
    console.log("Selected event is:");
    console.log(this.selectedEvent);
    
    
    if (this.selectedEvent === undefined) {
      this.selectedEvent = new Event();
    }

    this.eventForm = this.fb.group({
      title: [this.selectedEvent.title, Validators.required],
      startDate: [formatDate( this.selectedEvent.startDate, 'dd-MM-yyyy', 'en'), Validators.required],
      endDate: [this.selectedEvent.endDate, Validators.required],
      startTime: [this.selectedEvent.startTime, Validators.required],
      endTime: [this.selectedEvent.endTime, Validators.required],
      location: [this.selectedEvent.location, Validators.required],
      description: [this.selectedEvent.description, Validators.required]
    });

    console.log(this.eventForm.get('startDate').value);
    
  }

  onSubmit() {
    if (this.eventForm.invalid) { return; }

    if (this.isAddMode) {
      this.selectedEvent = this.eventForm.value;
      this.eventActions.addEvent(this.selectedEvent);
    } else {
      this.selectedEvent = {...this.selectedEvent, ...this.eventForm.value};
      this.eventActions.updateEvent(this.selectedEvent);
    }
    this.router.navigate(['events']);
  }

}
