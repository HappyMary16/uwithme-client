import { all, call, put, take } from 'redux-saga/effects';

import { loginFlow, signUp } from '../../pages/authorization/sagas/authSagas';
import {
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  RENDER_DEPARTMENTS,
  RENDER_GROUPS,
  RENDER_INSTITUTES
} from '../actions';
import http from '../../services/http';
import {
  GET_DEPARTMENTS,
  GET_GROUPS,
  GET_INSTITUTES
} from '../constants/serverApi';
import {
  downloadFilesBySubject,
  loadSubjects,
  openOrSaveFile
} from '../../pages/files/sagas';
import {
  saveSubjectSaga,
  uploadRequestWatcherSaga
} from '../../pages/files/add/sagas';
import { addAccessToFilesSaga } from '../../pages/files/share/sagas';

export function* loadInstitutes() {
  yield take(LOAD_INSTITUTES);
  const response = yield call(http, {
    url: GET_INSTITUTES,
    method: 'get'
  });

  yield put({ type: RENDER_INSTITUTES, response });
}

export function* loadDepartments() {
  yield take(LOAD_DEPARTMENTS);
  const response = yield call(http, {
    url: GET_DEPARTMENTS,
    method: 'get'
  });

  yield put({ type: RENDER_DEPARTMENTS, response });
}

export function* loadGroups() {
  yield take(LOAD_GROUPS);
  const response = yield call(http, {
    url: GET_GROUPS,
    method: 'get'
  });

  yield put({ type: RENDER_GROUPS, response });
}

export default function* rootSaga() {
  yield all([
    loginFlow(),
    loadDepartments(),
    loadInstitutes(),
    loadGroups(),
    uploadRequestWatcherSaga(),
    signUp(),
    loadSubjects(),
    saveSubjectSaga(),
    downloadFilesBySubject(),
    openOrSaveFile(),
    addAccessToFilesSaga()
  ]);
}
