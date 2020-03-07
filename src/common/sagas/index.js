import { call, put, takeEvery } from 'redux-saga/effects';

import {
  endFetching,
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  RENDER_DEPARTMENTS,
  RENDER_GROUPS,
  RENDER_INSTITUTES,
  startFetching
} from '../actions';
import http from '../../services/http';
import {
  GET_DEPARTMENTS,
  GET_GROUPS,
  GET_INSTITUTES,
  GET_INSTITUTES_WITH_PARAMETERS
} from '../constants/serverApi';

export function* commonDataWatcher() {
  yield takeEvery(LOAD_INSTITUTES, loadInstitutes);
  yield takeEvery(LOAD_INSTITUTES_BY_UNIVERSITY_ID, action =>
    loadInstitutesByUniversityId(action)
  );
  yield takeEvery(LOAD_DEPARTMENTS, loadDepartments);
  yield takeEvery(LOAD_GROUPS, loadGroups);
}

function* loadInstitutes() {
  try {
    yield put(startFetching());

    const institutes = yield call(http, {
      url: GET_INSTITUTES,
      method: 'get'
    });

    yield put({ type: RENDER_INSTITUTES, institutes });
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutesByUniversityId(action) {
  try {
    yield put(startFetching());
    const { payload } = action;

    const institutes = yield call(http, {
      url: GET_INSTITUTES_WITH_PARAMETERS + payload,
      method: 'get'
    });

    yield put({ type: RENDER_INSTITUTES, institutes });
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartments() {
  try {
    yield put(startFetching());

    const departments = yield call(http, {
      url: GET_DEPARTMENTS,
      method: 'get'
    });
    yield put({ type: RENDER_DEPARTMENTS, departments });
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}

function* loadGroups() {
  try {
    yield put(startFetching());

    const groups = yield call(http, {
      url: GET_GROUPS,
      method: 'get'
    });
    yield put({ type: RENDER_GROUPS, groups });
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}
