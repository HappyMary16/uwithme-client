import StateLoader from '../store/StateLoader';
import { ADD_ERROR, REMOVE_ERROR, REMOVE_MESSAGE, SET_MESSAGE } from '../actions/messageAction';
import { getMessage } from '../utils/MessageUtil';
import { SIGN_OUT } from '../pages/authorization/actions';

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
      let error = action.payload.error;

      if (error.status === 404 && error.data === "") {
        return state;
      }

      return {
        ...state,
        errors: [...state.errors,
          {
            id: new Date().getTime(),
            message: getMessage(error)
          }]
      };

    case REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => action.payload.id !== error.id)
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}