import { tassign } from "tassign";
import { EventActions } from "../actions/EventActions";
import { EventState } from "../Store";
import { DataService } from "../../services/data.service"

const tempService : DataService = new DataService();

const INITIAL_STATE: EventState = {events: tempService.getEvents() }

export function eventsReducer(state: EventState = INITIAL_STATE, action: any) {
    switch (action.type) {
        case EventActions.READ_EVENTS:
            return tassign(state, {events: action.payload});

        case EventActions.ADD_EVENT:
            return tassign(state, {events: [...state.events, action.payload]});

        case EventActions.UPDATE_EVENT:
            const eventsCopy = [...state.events];
            console.log("Current events array:", eventsCopy);

            const index = state.events.findIndex(event => event.id === action.payload.id);
            console.log("Index of updated event:", index);
            console.log("Payload is:", action.payload);

            eventsCopy[index] = action.payload;
            console.log("Events array after update:", eventsCopy);

            return tassign(state, {events: eventsCopy});

        case EventActions.DELETE_EVENT:
            let arrayCopy = [...state.events];
            arrayCopy = arrayCopy.filter(event => event.id !== action.payload);
            return tassign(state, {events: arrayCopy});

        default:
    }      return state;
}
