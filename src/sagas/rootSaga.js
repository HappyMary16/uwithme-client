import { all, call, put } from "redux-saga/effects";
import { authorizationWatcher } from "../pages/authorization/sagas";
import { fileOperationWatcher } from "../pages/user/files/sagas";
import { addFilesAndSubjectsWatcher } from "../pages/user/addFiles/sagas";
import { addAccessToFilesWatcher } from "../pages/user/shareFiles/sagas";
import { lectureHallWatcher } from "../pages/admin/lectureHalls/sagas";
import { groupWatcher } from "./groupSagas";
import { departmentWatcher } from "./departmentSagas";
import { instituteWatcher } from "./instituteSagas";
import { addLessonWatcher } from "../pages/admin/addLesson/sagas";
import { deleteLessonWatcher } from "../pages/admin/deleteLesson/sagas";
import { universityWatcher } from "./universitySagas";
import { scheduleWatcher } from "./scheduleSagas";
import { usersWatcher } from "./userSagas";
import { structureWatcher } from "./structureSagas";
import { studCabinetWatcher } from "./studCabinetSagas";
import { endFetching, startFetching } from "../pages/navigation/actions";
import http from "../services/http";
import { addError } from "../actions/messageAction";

export default function* rootSaga() {
  yield all([
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher(),
    scheduleWatcher(),
    addLessonWatcher(),
    deleteLessonWatcher(),
    usersWatcher(),
    lectureHallWatcher(),
    groupWatcher(),
    departmentWatcher(),
    instituteWatcher(),
    universityWatcher(),
    structureWatcher(),
    studCabinetWatcher()
  ]);
}

export function* processHttpCall({
  method,
  url,
  data,
  params,
  isFile,
  loadFile,
  onUploadProgress,
  ignoreNotFound
}) {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      method,
      url,
      data,
      params,
      isFile,
      loadFile,
      onUploadProgress
    });

    if (!response) {
      return;
    }

    if (ignoreNotFound && response.status === 404) {
      return;
    }

    if (response.status >= 200 && response.status < 300) {
      return response.data || true;
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
