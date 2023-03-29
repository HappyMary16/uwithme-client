import {RENDER_LESSON, RENDER_LESSONS, RENDER_LESSONS_FOR_CURRENT_USER_PAGE} from '../actions/scheduleActions';
import {loadState} from '../store/StateLoader';
import {SIGN_OUT} from '../actions/authActions';

export default function scheduleReducers(
  state = loadState().scheduleReducers || {
    lessons: [],
    otherUsersLessons: []
  },
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
        otherUsersLessons: action.payload.lessons
      };

    case SIGN_OUT:
      return {
        lessons: [],
        otherUsersLessons: []
      };

    default:
      return state;
  }
}
