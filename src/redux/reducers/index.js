import {combineReducers} from 'redux';
import {UIReducer} from './reducer-UI';
import {localGroupsReducer, pendingReducer} from './reducer-localGroups';

export const rootReducer = combineReducers({
  UI: UIReducer,
  localGroups: localGroupsReducer,
  pending: pendingReducer
});
