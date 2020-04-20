import { RENDER_LESSONS_FOR_CURRENT_USER_PAGE, RENDER_TEACHERS } from './actions';
import StateLoader from '../../store/StateLoader';


export default function usersReducer(
  state = new StateLoader().loadState().usersReducer || {},
  action
) {
  switch (action.type) {
    case RENDER_TEACHERS:
      return {
        ...state,
        teachers: action.payload.teachers
      };
    case RENDER_LESSONS_FOR_CURRENT_USER_PAGE:
      return {
        ...state,
        lessons: action.payload.lessons
      };
    default:
      return state;
  }
}
