import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../pages/navigation/actions';
import http from '../services/http';
import { DEPARTMENTS, INFO_DEPARTMENTS, USER_DEPARTMENT } from '../constants/serverApi';
import { addError } from '../actions/messageAction';
import { loadInstitutesByUniversityId } from '../actions/instituteActions';
import {
  CREATE_DEPARTMENT,
  departmentCreated, LOAD_DEPARTMENT, LOAD_DEPARTMENTS,
  LOAD_DEPARTMENTS_BY_UNIVERSITY_ID, renderDepartmentForRegistration, renderDepartments, renderUserDepartment
} from '../actions/departmentActions';

export function* departmentWatcher() {
  yield takeEvery(CREATE_DEPARTMENT, action => createDepartment(action));
  yield takeEvery(LOAD_DEPARTMENTS, action => loadDepartments(action));
  yield takeEvery(LOAD_DEPARTMENTS_BY_UNIVERSITY_ID, loadDepartmentsByUniversityId);
  yield takeEvery(LOAD_DEPARTMENT, loadDepartment);
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

function* loadDepartments(action) {
  try {
    yield put(startFetching());
    let { instituteId } = action.payload;

    const departments = yield call(http, {
      url: INFO_DEPARTMENTS + instituteId,
      method: 'get'
    });

    if (departments) {
      yield put(renderDepartmentForRegistration(departments.data));
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

    const response = yield call(http, {
      url: DEPARTMENTS,
      method: 'get'
    });

    if (response) {
      yield put(renderDepartments(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartment() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: USER_DEPARTMENT,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderUserDepartment(response.data));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
