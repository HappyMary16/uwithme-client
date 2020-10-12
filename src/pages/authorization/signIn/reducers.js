import StateLoader from '../../../store/StateLoader';
import { RENDER_MY_AVATAR, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_OUT } from './actions';

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {},
  action
) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.response.data
      };
    case RENDER_MY_AVATAR: {
      let userWithAvatar = state.user;
      userWithAvatar.avatar = action.payload.avatar;
      return {
        ...state,
        user: userWithAvatar
      };
    }
    case SIGN_OUT:
      return {};
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
