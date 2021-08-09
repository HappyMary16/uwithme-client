import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  DEBTS,
  STUD_CAB_STUDENTS,
  STUDENTS_RATING,
  SUBJECTS_SCORES
} from "../constants/serverApi";
import {
  LOAD_DEBTS,
  LOAD_STUDENTS_RATING,
  LOAD_SUBJECTS_SCORES,
  renderDebts,
  renderStudentInfo,
  renderStudentsRating,
  renderSubjectsScores
} from "../actions/studCabinetActions";
import { processHttpCall } from "./rootSaga";

export function* studCabinetWatcher() {
  yield takeEvery(LOAD_STUDENTS_RATING, loadStudentsRating);
  yield takeEvery(LOAD_SUBJECTS_SCORES, loadSubjectsScores);
  yield takeEvery(LOAD_DEBTS, loadDebts);
}

const getStudentInfo = state => state.studCabinetReducers.studentInfo;

function* loadStudentAndGetSemester({ email, password, semester }) {
  let studentInfo = yield select(getStudentInfo);

  if (!studentInfo || !studentInfo.email || !studentInfo.password) {
    yield call(loadStudentInfo, email, password);
  }

  return semester || (yield select(getStudentInfo)).semester;
}

function* loadStudentsRating(action) {
  let { email, password } = action.payload;

  let semester = yield call(loadStudentAndGetSemester, action.payload);

  const response = yield call(processHttpCall, {
    url: STUDENTS_RATING + semester,
    method: "get",
    params: {
      email,
      password
    }
  });

  if (response) {
    yield put(renderStudentsRating(semester, response));
  }
}

function* loadSubjectsScores(action) {
  let { email, password } = action.payload;

  let semester = yield call(loadStudentAndGetSemester, action.payload);

  const response = yield call(processHttpCall, {
    url: SUBJECTS_SCORES + semester,
    method: "get",
    params: {
      email,
      password
    }
  });

  if (response) {
    yield put(renderSubjectsScores(semester, response));
  }
}

function* loadDebts(action) {
  let { email, password } = action.payload;

  yield call(loadStudentInfo, email, password);

  const response = yield call(processHttpCall, {
    url: DEBTS,
    method: "get",
    params: {
      email,
      password
    }
  });

  if (response) {
    yield put(renderDebts(response));
  }
}

function* loadStudentInfo(email, password) {
  const response = yield call(processHttpCall, {
    url: STUD_CAB_STUDENTS,
    method: "get",
    params: {
      email,
      password
    }
  });

  if (response) {
    yield put(renderStudentInfo(response, email, password));
  }
}
