import { call, put, takeEvery } from 'redux-saga/effects';
import { renderInstitutesForRegistration } from '../actions/instituteActions';
import { LOAD_USER_UNIVERSITY_INFO } from '../actions/structureActions';
import { renderDepartmentForRegistration } from '../actions/departmentActions';
import { loadGroups } from '../actions/groupActions';
import http from '../services/http';
import { INFO_DEPARTMENTS, INFO_INSTITUTES } from '../constants/serverApi';

export function* structureWatcher() {
  yield takeEvery(LOAD_USER_UNIVERSITY_INFO, action =>
    loadUserUniversityInfo(action)
  );
}

function* loadUserUniversityInfo(action) {
  let { universityId, instituteId, departmentId } = action.payload;

  if (!!universityId) {
    const response = yield call(http, {
      url: INFO_INSTITUTES + universityId,
      method: 'get'
    });

    if (response) {
      yield put(renderInstitutesForRegistration(response.data));
    }
  }

  if (!!instituteId) {
    yield call(loadUserInstituteInfo, { instituteId, departmentId });
  }
}

function* loadUserInstituteInfo({ instituteId, departmentId }) {
  const departments = yield call(http, {
    url: INFO_DEPARTMENTS + instituteId,
    method: 'get'
  });

  if (departments) {
    yield put(renderDepartmentForRegistration(departments.data));
  }

  if (!!departmentId) {
    yield put(loadGroups(departmentId));
  }
}
