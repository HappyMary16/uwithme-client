import StateLoader from '../../../store/StateLoader';
import { LOAD_FILES, RENDER_SUBJECTS } from '../actions/userActions';

export default function userReducers(
  state = new StateLoader().loadState().userReducers,
  action
) {
  switch (action.type) {
    case LOAD_FILES:
      return {
        ...state,
        files: action.files
      };
    case RENDER_SUBJECTS: {
      return {
        ...state,
        subjects: action.response.data
      };
    }
    default:
      return state;
  }
}
