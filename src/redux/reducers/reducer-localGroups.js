//import { initialState } from './initialState';

export const localGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHED_LISTS':
      return action.payload;
    default:
      return state;
  }
};

export const pendingReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHED_LISTS':
      return action.pending;
    default:
      return state;
  }
};
