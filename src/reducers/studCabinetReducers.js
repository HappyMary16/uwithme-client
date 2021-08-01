import StateLoader from '../store/StateLoader';

import { SIGN_OUT } from '../pages/authorization/actions';
import {
  RENDER_STUDENT_INFO,
  RENDER_STUDENTS_RATING
} from '../actions/studCabinetActions';

export default function studCabinetReducers(
  state = new StateLoader().loadState().studCabinetReducers || {
    studentsScores: {},
    studentInfo: {}
  },
  action
) {
  switch (action.type) {
    case RENDER_STUDENTS_RATING: {
      const { semester, studentsScores } = action.payload;
      state.studentsScores[semester] = studentsScores;
      return state;
    }

    case RENDER_STUDENT_INFO:
      return {
        ...state,
        studentInfo: action.payload
      };

    case SIGN_OUT:
      return {
        studentsScores: {},
        studentInfo: {}
      };

    default:
      return state;
  }
}
