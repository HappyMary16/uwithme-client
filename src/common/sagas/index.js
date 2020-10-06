import { call, put, takeEvery } from 'redux-saga/effects';

import { endFetching, startFetching } from '../actions';
import http from '../../services/http';
import { INFO_DEPARTMENTS, INFO_GROUPS, INFO_INSTITUTES, INFO_UNIVERSITIES } from '../../constants/serverApi';
import {
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  LOAD_UNIVERSITIES,
  RENDER_DEPARTMENTS,
  RENDER_INSTITUTES,
  renderUniversities
} from '../../pages/administration/structure/actions';
import { renderGroups } from '../../pages/groups/actions';

export function* commonDataWatcher() {
  yield takeEvery(LOAD_UNIVERSITIES, loadUniversities);
  yield takeEvery(LOAD_INSTITUTES, loadInstitutes);
  yield takeEvery(LOAD_DEPARTMENTS, loadDepartments);
  yield takeEvery(LOAD_GROUPS, loadGroups);
}

function* loadUniversities() {
  try {
    yield put(startFetching());

    const universities = yield call(http, {
      url: INFO_UNIVERSITIES,
      method: 'get'
    });

    if (universities) {
      yield put(renderUniversities(universities.data));
    }
  } catch (e) {
    alert(e + ' loadUniversities');
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutes() {
  try {
    yield put(startFetching());

    const institutes = yield call(http, {
      url: INFO_INSTITUTES,
      method: 'get'
    });

    if (institutes) {
      yield put({ type: RENDER_INSTITUTES, institutes });
    }
  } catch (e) {
    alert(e + ' loadInstitutes()');
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartments() {
  try {
    yield put(startFetching());

    const departments = yield call(http, {
      url: INFO_DEPARTMENTS,
      method: 'get'
    });

    if (departments) {
      yield put({ type: RENDER_DEPARTMENTS, departments });
    }
  } catch (e) {
    alert(e + ' loadDepartments()');
  } finally {
    yield put(endFetching());
  }
}

function* loadGroups() {
  try {
    yield put(startFetching());

    const groups = yield call(http, {
      url: INFO_GROUPS,
      method: 'get'
    });

    if (groups) {
      yield put(renderGroups(groups.data));
    }
  } catch (e) {
    alert(e + ' loadGroups()');
  } finally {
    yield put(endFetching());
  }
}
