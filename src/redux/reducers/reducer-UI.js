import {UI} from './initialState';

export const UIReducer = (state = UI, action) => {
  switch (action.type) {
    case 'FETCHED_LISTS':
      return {
        ...state,
        forumsFetched: true
      };
    default:
      return state;
  }
};
