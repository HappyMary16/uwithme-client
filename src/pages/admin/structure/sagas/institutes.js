import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_INSTITUTE,
  instituteCreated,
  LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  RENDER_INSTITUTES
} from '../actions';
import {
  addError,
  endFetching,
  startFetching
} from '../../../navigation/actions';
import http from '../../../../services/http';
import { INSTITUTES } from '../../../../constants/serverApi';

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
      alert(response);
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
      yield put({ type: RENDER_INSTITUTES, institutes });
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
