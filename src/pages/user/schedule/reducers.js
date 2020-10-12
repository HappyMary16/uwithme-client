import { RENDER_LESSONS } from './actions';
import StateLoader from '../../../store/StateLoader';
import { SIGN_OUT } from '../../authorization/signIn/actions';

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
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
