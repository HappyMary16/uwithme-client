import { ADD_UNIVERSITY, CREATE_INSTITUTE } from './actions';

export default function adminReducers(state = {}, action) {
  switch (action.type) {
    case ADD_UNIVERSITY:
      return {
        ...state,
        state
      };
    case CREATE_INSTITUTE:
      return {
        ...state,
        state
      };
    default:
      return state;
  }
}
