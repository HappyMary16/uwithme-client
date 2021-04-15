import { put, takeEvery } from 'redux-saga/effects';
import { loadInstitutes } from '../actions/instituteActions';
import { LOAD_USER_UNIVERSITY_INFO } from '../actions/structureActions';
import { loadDepartments } from '../actions/departmentActions';
import { loadGroups } from '../actions/groupActions';

export function* structureWatcher() {
  yield takeEvery(LOAD_USER_UNIVERSITY_INFO, action => loadUserUniversityInfo(action));
}

function* loadUserUniversityInfo(action) {
  let {
    universityId,
    instituteId,
    departmentId
  } = action.payload;

  if (universityId !== undefined) {
    yield put(loadInstitutes(universityId));
  }
  if (instituteId !== undefined) {
    yield put(loadDepartments(instituteId));
  }
  if (departmentId !== undefined) {
    yield put(loadGroups(departmentId));
  }
}
