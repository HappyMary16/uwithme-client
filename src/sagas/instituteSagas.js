import { call, put, takeEvery } from 'redux-saga/effects';

import { endFetching, startFetching } from '../pages/navigation/actions';
import http from '../services/http';
import { INFO_INSTITUTES, INSTITUTES, USER_INSTITUTE } from '../constants/serverApi';
import { addError } from '../actions/messageAction';
import {
  CREATE_INSTITUTE,
  instituteCreated, LOAD_INSTITUTE, LOAD_INSTITUTES,
  LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  renderInstitutes, renderInstitutesForRegistration, renderUserInstitute
} from '../actions/instituteActions';

export function* instituteWatcher() {
  yield takeEvery(CREATE_INSTITUTE, action => createInstitute(action));
  yield takeEvery(LOAD_INSTITUTES, action => loadInstitutes(action));
  yield takeEvery(LOAD_INSTITUTES_BY_UNIVERSITY_ID, loadInstitutesByUniversityId
  );
  yield takeEvery(LOAD_INSTITUTE, loadInstitute);
}

function* createInstitute(action) {
  try {
    yield put(startFetching());

    const { instituteName } = action.payload;

    const response = yield call(http, {
      url: INSTITUTES,
      method: 'post',
      data: {
        instituteName: instituteName
      }
    });

    if (response && response.status === 200) {
      yield put(instituteCreated(response.data));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutes(action) {
  try {
    yield put(startFetching());
    let { universityId } = action.payload;

    const institutes = yield call(http, {
      url: INFO_INSTITUTES + universityId,
      method: 'get'
    });

    if (institutes) {
      yield put(renderInstitutesForRegistration(institutes.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutesByUniversityId() {
  try {
    yield put(startFetching());

    const institutes = yield call(http, {
      url: INSTITUTES,
      method: 'get'
    });

    if (institutes) {
      yield put(renderInstitutes(institutes.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitute() {
  try {
    yield put(startFetching());

    const institute = yield call(http, {
      url: USER_INSTITUTE,
      method: 'get'
    });

    if (institute && institute.status === 200) {
      yield put(renderUserInstitute(institute.data));
    } else {
      yield put(addError(institute));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
