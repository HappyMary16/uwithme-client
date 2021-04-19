import StateLoader from '../../store/StateLoader';
import {
  KEYCLOAK_SIGN_IN_SUCCESS, REGISTRATION_COMPLETE,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from './actions';
import { RENDER_MY_AVATAR } from '../../actions/userActions';
import * as Config from '../../config.json';

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
        user: undefined,
        avatar: undefined
      };

    case KEYCLOAK_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        clientVersion: Config.client_version
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
