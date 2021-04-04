import { RENDER_AVATAR, RENDER_USER, RENDER_USERS } from '../actions/userActions';
import { SIGN_OUT } from '../pages/authorization/actions';
import StateLoader from '../store/StateLoader';

export default function userReducers(
  state = new StateLoader().loadState().userReducers || {
    users: [],
    avatars: []
  },
  action
) {
  switch (action.type) {

    case RENDER_USERS:
      return {
        ...state,
        users: state.users
          .filter(
            user => !action.payload.users.map(u => u.id).includes(user.id)
          )
          .concat(action.payload.users)
      };

    case RENDER_USER:
      return {
        ...state,
        users: [
          ...state.users.filter(user => user.id !== action.payload.user.id),
          action.payload.user
        ]
      };

    case RENDER_AVATAR:
      let userWithAvatar = state.users.filter(
        user => user.id === action.payload.userId
      )[0];
      userWithAvatar.avatar = action.payload.avatar;
      return {
        ...state,
        users: [
          ...state.users.filter(user => user.id !== action.payload.userId),
          userWithAvatar
        ]
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}
