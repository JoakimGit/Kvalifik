import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Event } from 'src/app/entities/Event';
import { EventService } from 'src/app/services/event.service';

@Injectable({ providedIn: 'root'})
export class EventActions {

    constructor (private ngRedux: NgRedux<AppState>, private eventService: EventService)
    {}

  static ADD_EVENT: string = 'ADD_EVENT';
  static UPDATE_EVENT: string = 'UPDATE_EVENT';
  static READ_EVENTS: string = 'READ_EVENTS'; 
  static DELETE_EVENT: string = 'DELETE_EVENT'; 

  readEvents() {
    this.eventService.readEvents().subscribe((result: any) => {
      console.log("Reading events from database");
      console.log(result);

      let events: Event[] = [];
      for (let id in result) {
        let eventObj = result[id]
        eventObj.id = id;
        eventObj.startDate = new Date(eventObj.startDate);        
        eventObj.endDate = new Date(eventObj.endDate);
        
        events.push(eventObj as Event);
      }      

      this.ngRedux.dispatch({
        type: EventActions.READ_EVENTS,
        payload: events
      });
    });
  }

  addEvent(newEvent: Event) : void {
    this.eventService.saveEvent(newEvent).subscribe((result: any) => {
      console.log("Saving event in database");
      console.log(result);

      newEvent.id = result.name;

      this.ngRedux.dispatch({
        type: EventActions.ADD_EVENT,
        payload: newEvent
      });      
    });
  }

  updateEvent(updatedEvent: Event) : void {
    this.eventService.updateEvent(updatedEvent).subscribe((result: any) => {
      console.log("Updating event in database");
      console.log(result);

      this.ngRedux.dispatch({
        type: EventActions.UPDATE_EVENT,
        payload: updatedEvent
      });      
    });
  }

  deleteEvent(id: string) : void {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        console.log('Delete successful');
      },
      error: error => {
        console.error('There was an error!', error);
      }      
    });

    this.ngRedux.dispatch({
      type: EventActions.DELETE_EVENT,
      payload: id
    });
  }
}