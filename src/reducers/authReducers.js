import StateLoader from "../store/StateLoader";
import { RENDER_MY_AVATAR } from "../actions/userActions";
import * as config from "../config";
import {
  REGISTRATION_COMPLETE,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from "../actions/authActions";

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {
    isRegistrationComplete: true,
    user: undefined,
    avatar: undefined
  },
  action
) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isRegistrationComplete: true,
        clientVersion: config.CLIENT_VERSION
      };

    case RENDER_MY_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar
      };
    }

    case REGISTRATION_COMPLETE:
      return {
        ...state,
        isRegistrationComplete: false
      };

    case SIGN_OUT:
      return {
        isRegistrationComplete: true,
        user: undefined,
        avatar: undefined,
        clientVersion: config.CLIENT_VERSION
      };

    default:
      return state;
  }
}
