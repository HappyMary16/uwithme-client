import { ADD_UNIVERSITY } from './actions';

export default function adminReducers(state = {}, action) {
  switch (action.type) {
    case ADD_UNIVERSITY:
      return {
        ...state,
        state
      };

    default:
      return state;
  }
}
