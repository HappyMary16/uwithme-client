import { RENDER_LESSONS } from './actions';

export default function scheduleReducers(
  state = {},
  action
) {
  switch (action.type) {
    case RENDER_LESSONS:
      return {
        ...state,
        lessons: action.payload.lessons
      };

    default:
      return state;
  }
}
