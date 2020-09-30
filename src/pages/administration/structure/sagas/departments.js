import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_DEPARTMENT,
  departmentCreated,
  LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
  loadInstitutesByUniversityId,
  RENDER_DEPARTMENTS
} from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import { ADD_DEPARTMENT_API, GET_DEPARTMENTS_WITH_PARAMETERS } from '../../../../constants/serverApi';

export function* departmentWatcher() {
  yield takeEvery(CREATE_DEPARTMENT, action => createDepartment(action));
  yield takeEvery(LOAD_DEPARTMENTS_BY_UNIVERSITY_ID, action => loadDepartmentsByUniversityId(action));
}

function* createDepartment(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName } = action.payload;

    const response = yield call(http, {
      url: ADD_DEPARTMENT_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName,
        departmentName: departmentName
      }
    });

    if (response && response.status === 200) {
      yield put(departmentCreated(response.data));
      yield put(loadInstitutesByUniversityId(universityId));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartmentsByUniversityId(action) {
  try {
    yield put(startFetching());
    const { payload } = action;

    const departments = yield call(http, {
      url: GET_DEPARTMENTS_WITH_PARAMETERS + payload,
      method: 'get'
    });

    if (departments) {
      yield put({ type: RENDER_DEPARTMENTS, departments });
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}
