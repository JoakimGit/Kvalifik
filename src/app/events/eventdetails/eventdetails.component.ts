import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/entities/Event';
import { AppState } from 'src/app/store/Store';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})
export class EventdetailsComponent implements OnInit {
  public selectedEvent: Event;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];

    this.ngRedux.select(state => state.events).subscribe(res => {
      this.selectedEvent = res.events.find(event => event.id === id);
    });
  }
}
