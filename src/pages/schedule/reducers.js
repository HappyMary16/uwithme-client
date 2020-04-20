import { RENDER_LESSONS } from './actions';
import StateLoader from '../../store/StateLoader';

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

    default:
      return state;
  }
}
