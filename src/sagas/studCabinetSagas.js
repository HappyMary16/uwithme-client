import { call, put, takeEvery } from 'redux-saga/effects';
import http from '../services/http';
import { STUDENTS_RATING } from '../constants/serverApi';
import {
  LOAD_STUDENTS_RATING,
  renderStudentsRating
} from '../actions/studCabinetActions';

export function* studCabinetWatcher() {
  yield takeEvery(LOAD_STUDENTS_RATING, action => loadStudentsRating(action));
}

function* loadStudentsRating(action) {
  let { email, password, semester } = action.payload;

  const response = yield call(http, {
    url: STUDENTS_RATING + semester,
    method: 'get',
    params: {
      email,
      password
    }
  });

  if (response) {
    yield put(renderStudentsRating(semester, response.data));
  }
}
