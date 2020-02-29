import StateLoader from '../../store/StateLoader';
import {
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from './actions';

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {},
  action
) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username,
          password: action.password
        }
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.response.data
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        user: null,
        error: action.error
      };
    default:
      return state;
  }
}
