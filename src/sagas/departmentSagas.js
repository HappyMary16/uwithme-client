import { call, put, takeEvery } from 'redux-saga/effects';
import { DEPARTMENTS, INFO_DEPARTMENTS, USER_DEPARTMENT } from '../constants/serverApi';
import {
  CREATE_DEPARTMENT,
  departmentCreated,
  LOAD_DEPARTMENT,
  LOAD_DEPARTMENTS,
  LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
  renderDepartmentForRegistration,
  renderDepartments,
  renderUserDepartment
} from '../actions/departmentActions';
import { processHttpCall } from './rootSaga';
import { createInstitute } from './instituteSagas';

export function* departmentWatcher() {
  yield takeEvery(CREATE_DEPARTMENT, createDepartment);
  yield takeEvery(LOAD_DEPARTMENTS, loadDepartments);
  yield takeEvery(
    LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
    loadDepartmentsByUniversityId
  );
  yield takeEvery(LOAD_DEPARTMENT, loadDepartment);
}

export function* createDepartment(action) {
  const { instituteId } = action.payload;

  if (!instituteId) {
    const institute = yield call(createInstitute, action);
    action.payload.instituteId = institute.id;
  }

  const response = yield call(processHttpCall, {
    url: DEPARTMENTS,
    method: 'post',
    data: action.payload
  });

  if (response) {
    yield put(departmentCreated(response));
    return response;
  }
}

function* loadDepartments(action) {
  let { instituteId } = action.payload;

  const response = yield call(processHttpCall, {
    url: INFO_DEPARTMENTS + instituteId,
    method: 'get'
  });

  if (response) {
    yield put(renderDepartmentForRegistration(response));
  }
}

function* loadDepartmentsByUniversityId() {
  const response = yield call(processHttpCall, {
    url: DEPARTMENTS,
    method: 'get'
  });

  if (response) {
    yield put(renderDepartments(response));
  }
}

function* loadDepartment() {
  const response = yield call(processHttpCall, {
    url: USER_DEPARTMENT,
    method: 'get',
    ignoreNotFound: true
  });

  if (response) {
    yield put(renderUserDepartment(response));
  }
}
