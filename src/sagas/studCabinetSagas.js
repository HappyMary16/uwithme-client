import { call, put, takeEvery, select } from 'redux-saga/effects';
import http from '../services/http';
import { STUD_CAB_STUDENTS, STUDENTS_RATING } from '../constants/serverApi';
import {
  LOAD_STUDENTS_RATING,
  renderStudentInfo,
  renderStudentsRating
} from '../actions/studCabinetActions';
import { endFetching, startFetching } from '../pages/navigation/actions';
import { addError } from '../actions/messageAction';

export function* studCabinetWatcher() {
  yield takeEvery(LOAD_STUDENTS_RATING, action => loadStudentsRating(action));
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
