import { call, put, takeEvery, select } from 'redux-saga/effects';
import http from '../services/http';
import {
  DEBTS,
  STUD_CAB_STUDENTS,
  STUDENTS_RATING,
  SUBJECTS_SCORES
} from '../constants/serverApi';
import {
  LOAD_DEBTS,
  LOAD_STUDENTS_RATING,
  LOAD_SUBJECTS_SCORES,
  renderDebts,
  renderStudentInfo,
  renderStudentsRating,
  renderSubjectsScores
} from '../actions/studCabinetActions';
import { endFetching, startFetching } from '../pages/navigation/actions';
import { addError } from '../actions/messageAction';

export function* studCabinetWatcher() {
  yield takeEvery(LOAD_STUDENTS_RATING, action => loadStudentsRating(action));
  yield takeEvery(LOAD_SUBJECTS_SCORES, action => loadSubjectsScores(action));
  yield takeEvery(LOAD_DEBTS, action => loadDebts(action));
}

export const getStudentInfo = state => state.studCabinetReducers.studentInfo;

function* loadStudentsRating(action) {
  try {
    yield put(startFetching());
    let { email, password, semester } = action.payload;
    let studentInfo = yield select(getStudentInfo);

    if (!studentInfo || !studentInfo.email || !studentInfo.password) {
      yield call(loadStudentInfo, email, password);
    }

    if (!semester) {
      semester = (yield select(getStudentInfo)).semester;
    }

    if (!semester) {
      return;
    }

    const response = yield call(http, {
      url: STUDENTS_RATING + semester,
      method: 'get',
      params: {
        email,
        password
      }
    });

    if (response && response.status === 200) {
      yield put(renderStudentsRating(semester, response.data));
    } else {
      yield put(addError(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadSubjectsScores(action) {
  try {
    yield put(startFetching());
    let { email, password, semester } = action.payload;
    let studentInfo = yield select(getStudentInfo);

    if (!studentInfo || !studentInfo.email || !studentInfo.password) {
      yield call(loadStudentInfo, email, password);
    }

    if (!semester) {
      semester = (yield select(getStudentInfo)).semester;
    }

    if (!semester) {
      return;
    }

    const response = yield call(http, {
      url: SUBJECTS_SCORES + semester,
      method: 'get',
      params: {
        email,
        password
      }
    });

    if (response && response.status === 200) {
      yield put(renderSubjectsScores(semester, response.data));
    } else {
      yield put(addError(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadDebts(action) {
  try {
    yield put(startFetching());
    let { email, password } = action.payload;
    let studentInfo = yield select(getStudentInfo);

    if (!studentInfo || !studentInfo.email || !studentInfo.password) {
      yield call(loadStudentInfo, email, password);
    }

    const response = yield call(http, {
      url: DEBTS,
      method: 'get',
      params: {
        email,
        password
      }
    });

    if (response && response.status === 200) {
      yield put(renderDebts(response.data));
    } else {
      yield put(addError(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadStudentInfo(email, password) {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: STUD_CAB_STUDENTS,
      method: 'get',
      params: {
        email,
        password
      }
    });

    if (response && response.status === 200) {
      yield put(renderStudentInfo(response.data, email, password));
    } else {
      yield put(addError(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
