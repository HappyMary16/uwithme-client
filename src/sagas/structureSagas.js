import { call, put, takeEvery } from "redux-saga/effects";
import { renderInstitutesForRegistration } from "../actions/instituteActions";
import { LOAD_USER_UNIVERSITY_INFO } from "../actions/structureActions";
import { renderDepartmentForRegistration } from "../actions/departmentActions";
import { loadGroups } from "../actions/groupActions";
import { INFO_DEPARTMENTS, INFO_INSTITUTES } from "../constants/serverApi";
import { processHttpCall } from "./rootSaga";

export function* structureWatcher() {
  yield takeEvery(LOAD_USER_UNIVERSITY_INFO, loadUserUniversityInfo);
}

function* loadUserUniversityInfo(action) {
  let { universityId, instituteId } = action.payload;

  if (!!universityId) {
    const response = yield call(processHttpCall, {
      url: INFO_INSTITUTES + universityId,
      method: "get"
    });

    if (response) {
      yield put(renderInstitutesForRegistration(response));
    }
  }

  if (!!instituteId) {
    yield call(loadUserInstituteInfo, action.payload);
  }
}

function* loadUserInstituteInfo({ instituteId, departmentId }) {
  const response = yield call(processHttpCall, {
    url: INFO_DEPARTMENTS + instituteId,
    method: "get"
  });

  if (response) {
    yield put(renderDepartmentForRegistration(response));
  }

  if (!!departmentId) {
    yield put(loadGroups(departmentId));
  }
}
