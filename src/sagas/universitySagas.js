import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_UNIVERSITIES,
  LOAD_UNIVERSITY,
  renderUniversitiesForRegistration,
  renderUserUniversity
} from '../actions/universityActions';
import { endFetching, startFetching } from '../pages/navigation/actions';
import http from '../services/http';
import { INFO_UNIVERSITIES, UNIVERSITIES } from '../constants/serverApi';
import { addError } from '../actions/messageAction';

export function* universityWatcher() {
  yield takeEvery(LOAD_UNIVERSITIES, loadUniversities);
  yield takeEvery(LOAD_UNIVERSITY, loadUniversity);
}

function* loadUniversities() {
  try {
    yield put(startFetching());

    const universities = yield call(http, {
      url: INFO_UNIVERSITIES,
      method: 'get'
    });

    if (universities) {
      yield put(renderUniversitiesForRegistration(universities.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadUniversity() {
  try {
    yield put(startFetching());

    const universities = yield call(http, {
      url: UNIVERSITIES,
      method: 'get'
    });

    if (universities && universities.status === 200) {
      yield put(renderUserUniversity(universities.data));
    } else {
      yield put(addError(universities));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}