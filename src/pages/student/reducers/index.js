import StateLoader from '../../../store/StateLoader';
import { LOAD_FILES } from '../actions/userActions';

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
    default:
      return state;
  }
}
