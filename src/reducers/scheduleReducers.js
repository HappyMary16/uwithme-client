import { RENDER_LESSON, RENDER_LESSONS, RENDER_LESSONS_FOR_CURRENT_USER_PAGE } from '../actions/scheduleActions';
import StateLoader from '../store/StateLoader';
import { SIGN_OUT } from '../pages/authorization/actions';

export default function scheduleReducers(
  state = new StateLoader().loadState().scheduleReducers || {},
  action
) {
  switch (action.type) {

    case RENDER_LESSONS:
      return {
        ...state,
        lessons: action.payload.lessons
      };

    case RENDER_LESSON:
      let lessons = state.lessons.filter(
        lesson => lesson.id !== action.payload.lessonId
      );
      if (action.payload.newLesson) {
        lessons.push(action.payload.newLesson);
      }
      return {
        ...state,
        lessons: lessons
      };

    case RENDER_LESSONS_FOR_CURRENT_USER_PAGE:
      return {
        ...state,
        lessons: action.payload.lessons
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}
