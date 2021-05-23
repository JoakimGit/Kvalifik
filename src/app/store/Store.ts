import { combineReducers } from 'redux';
import { Event } from '../entities/Event';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { eventsReducer } from './reducers/EventReducer';
import { postsReducer } from './reducers/PostReducer';
import { usersReducer } from './reducers/UserReducer';
import { groupReducer} from './reducers/GroupReducer';

export class PostState {
    posts: Post[];
}

export class UserState {
    loggedInUser: User;
    token: string;
    users: User[];
}

export class GroupState {
  groups: User[];
}

export class EventState {
    events: Event[];
}

export class AppState {
    posts?: PostState;
    users?: UserState;
    groups?: GroupState;
    events?: EventState;
}

export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    users: usersReducer,
    events: eventsReducer,
    groups: groupReducer
});
