import StateLoader from '../store/StateLoader';

import { SIGN_OUT } from '../pages/authorization/actions';
import {
  RENDER_DEBTS,
  RENDER_STUDENT_INFO,
  RENDER_STUDENTS_RATING,
  RENDER_SUBJECTS_SCORES
} from '../actions/studCabinetActions';

export default function studCabinetReducers(
  state = new StateLoader().loadState().studCabinetReducers || {
    studentsScores: {},
    subjectsScores: {},
    studentInfo: {},
    debts: []
  },
  action
) {
  switch (action.type) {
    case RENDER_STUDENTS_RATING: {
      const { semester, studentsScores } = action.payload;
      state.studentsScores[semester] = studentsScores;
      return state;
    }

    case RENDER_SUBJECTS_SCORES: {
      const { semester, subjectsScores } = action.payload;
      state.subjectsScores[semester] = subjectsScores;
      return state;
    }

    case RENDER_DEBTS: {
      return {
        ...state,
        debts: action.payload
      };
    }

    case RENDER_STUDENT_INFO:
      return {
        ...state,
        studentInfo: action.payload
      };

    case SIGN_OUT:
      return {
        studentsScores: {},
        studentInfo: {},
        subjectsScores: {}
      };

    default:
      return state;
  }
}
