import StateLoader from '../../../store/StateLoader';
import {
  UPLOAD_REQUEST,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './actions';

export default function filesReducers(
  state = new StateLoader().loadState().filesReducers,
  action
) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        files: action.files
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        files: action.data
      };
    default:
      return state;
  }
}
