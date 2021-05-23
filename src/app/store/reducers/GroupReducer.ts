import {GroupState} from '../Store';
import {tassign} from 'tassign';
import {GroupAction} from '../actions/GroupAction';

const groups = [];

const INITIAL_STATE: GroupState = {groups};

export function groupReducer(state: GroupState = INITIAL_STATE, action: any): GroupState{
  switch (action.type) {
    case GroupAction.READ_GROUPS:
      return tassign(state, {groups: action.payload});

    case GroupAction.SAVE_GROUP:
      return tassign(state, {groups: state.groups.concat(action.payload)});

    case GroupAction.UPDATE_GROUP:
      const newArray = [...state.groups];
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      newArray[index] = action.payload;
      return tassign(state, {groups: newArray});

    case GroupAction.DELETE_GROUP:
      let newArray2 = [...state.groups];
      newArray2 = newArray2.filter(group => group.id !== action.payload);
      return tassign(state, {groups: newArray2});

    default:
      return state;
  }
}
