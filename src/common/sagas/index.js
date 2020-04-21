import { call, put, takeEvery } from 'redux-saga/effects';

import { endFetching, startFetching } from '../actions';
import http from '../../services/http';
import { GET_DEPARTMENTS, GET_GROUPS, GET_INSTITUTES } from '../../constants/serverApi';
import {
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  RENDER_DEPARTMENTS,
  RENDER_GROUPS,
  RENDER_INSTITUTES
} from '../../pages/administration/structure/actions';

export function* commonDataWatcher() {
  yield takeEvery(LOAD_INSTITUTES, loadInstitutes);

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
    alert(e);
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
    alert(e);
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
    alert(e);
  } finally {
    yield put(endFetching());
  }
}
