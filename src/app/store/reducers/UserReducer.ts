import { tassign } from 'tassign';
import { UserActions } from '../actions/UserActions';
import { UserState } from '../Store';
import {VolunteerActions} from '../actions/VolunteerActions';

const users = [];

const INITIAL_STATE: UserState = {loggedInUser: undefined, token: '', users};

export function usersReducer(state: UserState = INITIAL_STATE, action: any): UserState {
 switch (action.type) {
    case UserActions.SIGNED_UP:
        return tassign(state, {
            loggedInUser: action.payload.user,
            token: action.payload.token
        });

    case UserActions.LOGGED_IN:
        return tassign(state, {
            loggedInUser: action.payload.user,
            token: action.payload.token
        });

   case VolunteerActions.READ_VOLUNTEERS:
     return tassign(state, {
       users: action.payload
     });

    default:
        return state;
 }
}
