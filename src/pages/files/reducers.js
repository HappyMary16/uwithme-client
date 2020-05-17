import StateLoader from '../../store/StateLoader';
import { RENDER_FILES, RENDER_SUBJECTS } from './actions';
import { UPLOAD_PROGRESS, UPLOAD_REQUEST, UPLOAD_SUCCESS } from './add/actions';
import { SIGN_OUT } from '../authorization/actions';

export default function filesReducers(
  state = new StateLoader().loadState().filesReducers || { uploadProgress: [] },
  action
) {
  switch (action.type) {
    case RENDER_FILES:
      const newFiles = action.response.data.map(obj => {
        let file = {};
        file.id = obj.fileId;
        file.name = obj.fileName;
        file.subjectId = obj.subjectId;
        file.type = obj.type;
        return file;
      });

      return {
        ...state,
        files: newFiles
      };

    case RENDER_SUBJECTS: {
      return {
        ...state,
        subjects: action.payload.subjects.data
      };
    }
    case SIGN_OUT:
      return {};
    case UPLOAD_REQUEST:
      return {
        ...state,
        filesNumber: action.files && action.files.length
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        //TODO do this after user see it
        uploadProgress: state.uploadProgress.length === state.filesNumber ? [] : state.uploadProgress
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: [...state.uploadProgress.filter(p => p.file !== action.payload.file),
          {
            file: action.payload.file,
            progress: action.payload.progress
          }]
      };
    default:
      return state;
  }
}
