import {
  RENDER_AVATAR,
  RENDER_LESSONS_FOR_CURRENT_USER_PAGE,
  RENDER_USER,
  RENDER_USERS
} from './actions';
import StateLoader from '../../store/StateLoader';
import { SIGN_OUT } from '../authorization/signIn/actions';

export default function usersReducer(
  state = new StateLoader().loadState().usersReducer || {
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
    case RENDER_LESSONS_FOR_CURRENT_USER_PAGE:
      return {
        ...state,
        lessons: action.payload.lessons
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
      return {
        users: [],
        avatars: []
      };
    default:
      return state;
  }
}
