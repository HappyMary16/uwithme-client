import StateLoader from '../../store/StateLoader';
import { ADD_ERROR, REMOVE_ERROR, REMOVE_MESSAGE, SET_MESSAGE } from './action';

export default function messageReducers(
  state = new StateLoader().loadState().messageReducers || { errors: [] },
  action
) {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        message: null
      };
    case ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload.error]
      };
    case REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => action.payload.code !== error.code)
      };
    default:
      return state;
  }
}
