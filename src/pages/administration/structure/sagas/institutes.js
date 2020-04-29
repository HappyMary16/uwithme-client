import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_INSTITUTE, instituteCreated, LOAD_INSTITUTES_BY_UNIVERSITY_ID, RENDER_INSTITUTES } from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import { ADD_INSTITUTE_API, GET_INSTITUTES_WITH_PARAMETERS } from '../../../../constants/serverApi';

export function* instituteWatcher() {
  yield takeEvery(CREATE_INSTITUTE, action => createInstitute(action));
  yield takeEvery(LOAD_INSTITUTES_BY_UNIVERSITY_ID, action => loadInstitutesByUniversityId(action));
}

function* createInstitute(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName } = action.payload;

    const response = yield call(http, {
      url: ADD_INSTITUTE_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName
      }
    });

    if (response && response.status === 200) {
      yield put(instituteCreated(response.data));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
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

    if (institutes) {
      yield put({ type: RENDER_INSTITUTES, institutes });
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}