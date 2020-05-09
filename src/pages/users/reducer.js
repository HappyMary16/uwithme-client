import { RENDER_GROUPS_FOR_TEACHER, RENDER_LESSONS_FOR_CURRENT_USER_PAGE, RENDER_USERS } from './actions';
import StateLoader from '../../store/StateLoader';
import { SIGN_OUT } from '../authorization/actions';


export default function usersReducer(
  state = new StateLoader().loadState().usersReducer || {},
  action
) {
  switch (action.type) {
    case RENDER_USERS:
      return {
        ...state,
        users: state.users.filter(user => !action.payload.users.map(u => u.id).includes(user.id))
          .concat(action.payload.users)
      };
    case RENDER_LESSONS_FOR_CURRENT_USER_PAGE:
      return {
        ...state,
        lessons: action.payload.lessons
      };
    case RENDER_GROUPS_FOR_TEACHER:
      return {
        ...state,
        groups: action.payload.groups.map(obj => {
          let group = {};
          group.value = obj.id;
          group.label = obj.name;
          group.departmentId = obj.departmentId;
          group.course = obj.course;
          return group;
        })
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
