import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOAD_UNIVERSITIES,
  LOAD_UNIVERSITY,
  renderUniversitiesForRegistration,
  renderUserUniversity
} from "../actions/universityActions";
import { INFO_UNIVERSITIES, UNIVERSITIES } from "../constants/serverApi";
import { processHttpCall } from "./rootSaga";

export function* universityWatcher() {
  yield takeEvery(LOAD_UNIVERSITIES, loadUniversities);
  yield takeEvery(LOAD_UNIVERSITY, loadUniversity);
}

function* loadUniversities() {
  const response = yield call(processHttpCall, {
    url: INFO_UNIVERSITIES,
    method: "get"
  });

  if (response) {
    yield put(renderUniversitiesForRegistration(response));
  }
}

function* loadUniversity() {
  const response = yield call(processHttpCall, {
    url: UNIVERSITIES,
    method: "get"
  });

  if (response) {
    yield put(renderUserUniversity(response));
  }
}
