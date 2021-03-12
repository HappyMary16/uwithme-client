import { call, put, takeEvery } from 'redux-saga/effects';

import { endFetching, startFetching } from '../../../navigation/actions';
import http from '../../../../services/http';
import { INSTITUTES } from '../../../../constants/serverApi';
import { addError } from '../../../common/action';
import {
  CREATE_INSTITUTE,
  instituteCreated,
  LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  renderInstitutes
} from '../../../../actions/instituteActions';

export function* instituteWatcher() {
  yield takeEvery(CREATE_INSTITUTE, action => createInstitute(action));
  yield takeEvery(LOAD_INSTITUTES_BY_UNIVERSITY_ID, () =>
    loadInstitutesByUniversityId()
  );
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

function* loadInstitutesByUniversityId() {
  try {
    yield put(startFetching());

    const institutes = yield call(http, {
      url: INSTITUTES,
      method: 'get'
    });

    if (institutes) {
      yield put(renderInstitutes(institutes));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
