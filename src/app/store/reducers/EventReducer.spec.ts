declare var require: any;
var deepFreeze = require('deep-freeze');
import { eventsReducer } from './../reducers/EventReducer';
import * as types from './../actions/EventActions';
import { Event } from 'src/app/entities/Event';
import { DataService } from "../../services/data.service"

describe('Event reducer unit tests', () => {
    const tempService : DataService = new DataService();
    let events = tempService.getEvents();

    it('Add Event', () => {
        const oldState = {events: events};
        const newEvent = {id: '8', title: 'Cherry blossom watching', startDate: new Date(2021, 7, 13), endDate: new Date(2021, 7, 13), startTime: '11:00',
            endTime: '17:30', description: 'Go to the park and watch cherry blossoms.', location: 'Park'} as Event;
        const action = {type: types.EventActions.ADD_EVENT, payload: newEvent};

        deepFreeze(oldState);

        const result = eventsReducer(oldState, action);

        expect(result.events.length).toEqual(oldState.events.length + 1);
        expect(result.events[result.events.length-1]).toEqual(newEvent);    
    });

    it('Update event', () => {
        const oldState = {events: events};
        const updatedEvent = {id: '2', title: 'Graffiti', startDate: new Date(2021, 5, 9), endDate: new Date(2021, 5, 9), startTime: '10:00',
            endTime: '15:00', description: 'Doing parkour around the city.', location: 'Amsterdam'} as Event;
        const action = {type: types.EventActions.UPDATE_EVENT, payload: updatedEvent};

        deepFreeze(oldState);

        const result = eventsReducer(oldState, action);
        const index = result.events.findIndex(event => event.id === updatedEvent.id);

        expect(result.events[index]).toEqual(updatedEvent);
    });

    it('Delete an event', () => {
        const oldState = {events: events};
        const idToRemove = "3";
        const action = {type: types.EventActions.DELETE_EVENT, payload: idToRemove};

        deepFreeze(oldState);

        const result = eventsReducer(oldState, action);

        const event = result.events.find(event => event.id === idToRemove);
        expect(event).toEqual(undefined);
        expect(result.events.length).toEqual(oldState.events.length -1);
    })
});