import StateLoader from '../../../store/StateLoader';
import {
  RENDER_FILES,
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
    case RENDER_FILES:
      const newFiles = action.response.data.map(obj => {
        let file = {};
        file.id = obj.fileId;
        file.name = obj.fileName;
        file.subjectId = obj.subjectId;
        file.type = obj.type;
        return file;
      });

      let files = [];
      if (state.files) {
        files = state.files.filter(
          file => file.subjectId !== newFiles[0].subjectId
        );
      }

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
