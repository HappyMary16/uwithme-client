import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_LESSONS_BY_GROUP_ID,
  LESSONS,
  LESSONS_BY_USERNAME
} from "../constants/serverApi";
import {
  FIND_LESSONS_BY_GROUP_ID,
  FIND_LESSONS_BY_USER_NAME,
  FIND_LESSONS_FOR_USER,
  renderLessons,
  renderLessonsForUser
} from "../actions/scheduleActions";
import { processHttpCall } from "./rootSaga";

export function* scheduleWatcher() {
  yield takeEvery(FIND_LESSONS_BY_GROUP_ID, findLessonsByGroupId);
  yield takeEvery(FIND_LESSONS_BY_USER_NAME, findLessons);
  yield takeEvery(FIND_LESSONS_FOR_USER, findLessonsByUsername);
}

function* findLessonsByGroupId(action) {
  const { groupId } = action.payload;

  const response = yield call(processHttpCall, {
    url: GET_LESSONS_BY_GROUP_ID + groupId,
    method: "get"
  });

  if (response) {
    yield put(renderLessons(response));
  }
}

function* findLessons() {
  const response = yield call(processHttpCall, {
    url: LESSONS,
    method: "get"
  });

  if (response) {
    yield put(renderLessons(response));
  }
}

function* findLessonsByUsername(action) {
  const { id } = action.payload;

  const response = yield call(processHttpCall, {
    url: LESSONS_BY_USERNAME + id,
    method: "get"
  });

  if (response) {
    yield put(renderLessonsForUser(response));
  }
}
