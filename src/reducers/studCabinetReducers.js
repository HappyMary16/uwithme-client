import StateLoader from "../store/StateLoader";

import {
  RENDER_DEBTS,
  RENDER_STUDENT_INFO,
  RENDER_STUDENTS_RATING,
  RENDER_SUBJECTS_SCORES
} from "../actions/studCabinetActions";
import { SIGN_OUT } from "../actions/authActions";

export default function studCabinetReducers(
  state = new StateLoader().loadState().studCabinetReducers || {
    studentsScores: [],
    subjectsScores: [],
    studentInfo: {},
    debts: []
  },
  action
) {
  switch (action.type) {
    case RENDER_STUDENTS_RATING: {
      const { semester, studentsScores } = action.payload;

      const newScores = studentsScores.map(studentScore => {
        return {
          ...studentScore,
          semester: semester
        };
      });

      return {
        ...state,
        studentsScores: state.studentsScores
          .filter(studentScore => studentScore.semester !== semester)
          .concat(newScores)
      };
    }

    case RENDER_SUBJECTS_SCORES: {
      const { semester, subjectsScores } = action.payload;

      const newScores = subjectsScores.map(subjectScore => {
        return {
          ...subjectScore,
          semester: semester
        };
      });

      return {
        ...state,
        subjectsScores: state.subjectsScores
          .filter(subjectScore => subjectScore.semester !== semester)
          .concat(newScores)
      };
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
        studentsScores: [],
        studentInfo: {},
        subjectsScores: [],
        debts: []
      };

    default:
      return state;
  }
}
