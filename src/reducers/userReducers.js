import { RENDER_AVATAR, RENDER_USER, RENDER_USERS, UN_ASSIGN_ROLE, UPDATE_ACTIVE_ROLE } from '../actions/userActions';
import StateLoader from '../store/StateLoader';
import { SIGN_OUT } from '../actions/authActions';

export default function userReducers(
  state = new StateLoader().loadState().userReducers || {
    users: {}
  },
  action
) {
  switch (action.type) {

    case RENDER_USERS: {
      let users = {};
      action.payload.users.forEach(user => {
        users[user.id] = user;
      });

      return {
        ...state,
        users: users
      };
    }

    case RENDER_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user.id]: action.payload.user
        }
      };

    case RENDER_AVATAR:
      let userId = action.payload.userId;

      if (!state.users[userId]) {
        console.warn('Cannot render avatar for user with id ' + userId);
        return state;
      }

      return {
        ...state,
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            avatar: action.payload.avatar
          }
        }
      };

    case UN_ASSIGN_ROLE: {
      const { userId, role } = action.payload;
      let user = state.users[userId];

      return {
        ...state,
        users: {
          ...state.users,
          [userId]: {
            ...user,
            roles: user.roles.filter(userRole => userRole !== role)
          }
        }
      };
    }

    case UPDATE_ACTIVE_ROLE:
      return {
        ...state,
        users: {}
      };

    case SIGN_OUT:
      return {
        users: {}
      };

    default:
      return state;
  }
}
