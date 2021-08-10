import StateLoader from "../store/StateLoader";
import { RENDER_MY_AVATAR } from "../actions/userActions";
import * as config from "../config";
import {
  KEYCLOAK_SIGN_IN_SUCCESS,
  REGISTRATION_COMPLETE,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from "../actions/authActions";

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {
    isAuthenticated: false,
    isRegistrationComplete: false,
    user: undefined,
    avatar: undefined
  },
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

    case KEYCLOAK_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        clientVersion: config.CLIENT_VERSION
      };

    case REGISTRATION_COMPLETE:
      return {
        ...state,
        isRegistrationComplete: action.payload.isRegistrationComplete
      };

    case SIGN_OUT:
      return {
        isAuthenticated: false,
        isRegistrationComplete: false,
        user: undefined,
        avatar: undefined
      };

    default:
      return state;
  }
}
