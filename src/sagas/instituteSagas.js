import { call, put, takeEvery } from "redux-saga/effects";
import {
  INFO_INSTITUTES,
  INSTITUTES,
  USER_INSTITUTE
} from "../constants/serverApi";
import {
  CREATE_INSTITUTE,
  instituteCreated,
  LOAD_INSTITUTE,
  LOAD_INSTITUTES,
  LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  renderInstitutes,
  renderInstitutesForRegistration,
  renderUserInstitute
} from "../actions/instituteActions";
import { processHttpCall } from "./rootSaga";

export function* instituteWatcher() {
  yield takeEvery(CREATE_INSTITUTE, createInstitute);
  yield takeEvery(LOAD_INSTITUTES, loadInstitutes);
  yield takeEvery(
    LOAD_INSTITUTES_BY_UNIVERSITY_ID,
    loadInstitutesByUniversityId
  );
  yield takeEvery(LOAD_INSTITUTE, loadInstitute);
}

function* createInstitute(action) {
  const response = yield call(processHttpCall, {
    url: INSTITUTES,
    method: "post",
    data: action.payload
  });

  if (response) {
    yield put(instituteCreated(response));
  }
}

function* loadInstitutes(action) {
  let { universityId } = action.payload;

  const response = yield call(processHttpCall, {
    url: INFO_INSTITUTES + universityId,
    method: "get"
  });

  if (response) {
    yield put(renderInstitutesForRegistration(response));
  }
}

function* loadInstitutesByUniversityId() {
  const response = yield call(processHttpCall, {
    url: INSTITUTES,
    method: "get"
  });

  if (response) {
    yield put(renderInstitutes(response));
  }
}

function* loadInstitute() {
  const response = yield call(processHttpCall, {
    url: USER_INSTITUTE,
    method: "get"
  });

  if (response) {
    yield put(renderUserInstitute(response));
  }
}
