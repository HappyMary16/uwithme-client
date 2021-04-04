import StateLoader from '../../store/StateLoader';
import {
  KEYCLOAK_SIGN_IN_SUCCESS, REGISTRATION_COMPLETE,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from './actions';
import { RENDER_MY_AVATAR } from '../../actions/userActions';

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {},
  action
) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };

    case RENDER_MY_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar
      };
    }

    case SIGN_OUT:
      return {
        isAuthenticated: false,
        user: null,
        avatar: null
      };

    case KEYCLOAK_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };

    case REGISTRATION_COMPLETE:
      return {
        ...state,
        isRegistrationComplete: action.payload.isRegistrationComplete
      };

    default:
      return state;
  }
}
