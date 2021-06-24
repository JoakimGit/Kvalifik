import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../store/Store';
import { MatTableDataSource } from '@angular/material/table';
import { EventActions } from '../store/actions/EventActions';
import { Event } from '../entities/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public dataSource = new MatTableDataSource<Event>();
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
      this.dataSource.data = res.events;
    });
  }

  searchEvents(searchInput: string) {
    this.dataSource.filter = searchInput.toLowerCase().trim();
  }

  editEvent(id: any) {
    this.router.navigate(['edit-event/', id]);
  }

  deleteEvent(id: any) {
    this.eventActions.deleteEvent(id);
  }
}
