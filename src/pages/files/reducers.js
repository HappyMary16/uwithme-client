import StateLoader from '../../store/StateLoader';
import { RENDER_FILES, RENDER_SUBJECTS } from './actions';
import { SIGN_OUT } from '../authorization/actions/authActions';
import { UPLOAD_REQUEST, UPLOAD_SUCCESS } from './add/actions';

export default function filesReducers(
  state = new StateLoader().loadState().filesReducers,
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
    case SIGN_OUT:
      return {
        ...state,
        subjects: null,
        files: null
      };
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

    default:
      return state;
  }
}
