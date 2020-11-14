import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_DEPARTMENT,
  departmentCreated,
  LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
  loadInstitutesByUniversityId,
  RENDER_DEPARTMENTS
} from '../actions';
import { endFetching, startFetching } from '../../../navigation/actions';
import http from '../../../../services/http';
import { DEPARTMENTS } from '../../../../constants/serverApi';
import { addError } from '../../../common/action';

export function* departmentWatcher() {
  yield takeEvery(CREATE_DEPARTMENT, action => createDepartment(action));
  yield takeEvery(LOAD_DEPARTMENTS_BY_UNIVERSITY_ID, () =>
    loadDepartmentsByUniversityId()
  );
}

function* createDepartment(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName } = action.payload;

    const response = yield call(http, {
      url: DEPARTMENTS,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName,
        departmentName: departmentName
      }
    });

    if (response && response.status === 200) {
      yield put(departmentCreated(response.data));
      yield put(loadInstitutesByUniversityId());
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartmentsByUniversityId() {
  try {
    yield put(startFetching());

    const departments = yield call(http, {
      url: DEPARTMENTS,
      method: 'get'
    });

    if (departments) {
      yield put({ type: RENDER_DEPARTMENTS, departments });
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
