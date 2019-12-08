import StateLoader from '../../../store/StateLoader';
import {
  UPLOAD_REQUEST,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './actions';

export default function uploadReducers(
  state = new StateLoader().loadState().authReducers,
  action
) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        file: action.file
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        file: action.file
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        err: action.err,
        error: action.error,
        file: action.file
      };
    default:
      return state;
  }
}
