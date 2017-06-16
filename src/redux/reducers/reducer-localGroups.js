//import { initialState } from './initialState';

export const localGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCHED_FORUMS':
      return action.payload;
    default:
      return state;
  }
};
