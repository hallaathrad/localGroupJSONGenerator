import { combineReducers } from 'redux';
import { localGroupsReducer } from './reducer-localGroups';

export const rootReducer = combineReducers({
  localGroups: localGroupsReducer
});
