import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../store/Store';
import { EventActions } from '../store/actions/EventActions';
import { DataService } from '../services/data.service';
import { Event } from '../entities/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public events: Event[];
  public search: string = '';
  public columnNames: string[] = ['title', 'startDate', 'startTime', 'location', 'btns'];

  constructor(
    private router: Router,
    private ngRedux: NgRedux<AppState>,
    private eventActions: EventActions
    ) { }

  ngOnInit(): void {
    this.eventActions.readEvents();

    this.ngRedux.select(state => state.events).subscribe(res => {
      this.events = res.events;
    })
  }

  editEvent(id: any) {
    this.router.navigate(['edit-event/', id]);
  }

  deleteEvent(id: any) {
    this.eventActions.deleteEvent(id);
  }

}
