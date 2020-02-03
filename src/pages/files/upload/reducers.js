import StateLoader from '../../../store/StateLoader';
import {
  GET_FILES_BY_SUBJECT,
  RENDER_SUBJECTS,
  UPLOAD_REQUEST,
  // UPLOAD_PROGRESS,
  UPLOAD_SUCCESS
  // UPLOAD_FAILURE
} from './actions';

export default function filesReducers(
  state = new StateLoader().loadState().filesReducers,
  action
) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        files: action.files,
        subjectId: action.subjectId,
        fileType: action.fileType
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        files: action.data
      };
    case GET_FILES_BY_SUBJECT:
      const newFiles = action.response.data.map(obj => {
        let file = {};
        file.name = obj.name;
        file.subjectId = obj.subjectId;
        file.type = obj.fileTypeId;
        return file;
      });
      const files = state.files.filter(
        file => file.subjectId !== newFiles[0].subjectId
      );

      return {
        ...state,
        files: files.concat(newFiles)
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
