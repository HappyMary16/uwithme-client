import {loadState} from '../store/StateLoader';
import {RENDER_MY_AVATAR} from '../actions/userActions';

export default function authReducers(
  state = loadState().authReducers || {
    avatar: undefined
  },
  action
) {
  switch (action.type) {

    case RENDER_MY_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar
      };
    }

    default:
      return state;
  }
}
