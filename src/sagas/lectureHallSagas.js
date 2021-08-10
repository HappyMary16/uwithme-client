import { call, put, takeEvery } from "redux-saga/effects";
import { GET_BUILDINGS, LECTURE_HALLS } from "../constants/serverApi";
import {
  CREATE_LECTURE_HALL,
  LOAD_BUILDINGS,
  LOAD_LECTURE_HALLS,
  renderBuildings,
  renderLectureHalls
} from "../actions/lectureHallActions";
import { processHttpCall } from "./rootSaga";

export function* lectureHallWatcher() {
  yield takeEvery(LOAD_LECTURE_HALLS, () => loadLectureHalls());
  yield takeEvery(LOAD_BUILDINGS, () => loadBuildings());
  yield takeEvery(CREATE_LECTURE_HALL, action => createLectureHall(action));
}

function* loadLectureHalls() {
  const response = yield call(processHttpCall, {
    url: LECTURE_HALLS,
    method: "get"
  });

  if (response) {
    yield put(renderLectureHalls(response));
  }
}

function* loadBuildings() {
  const buildings = yield call(processHttpCall, {
    url: GET_BUILDINGS,
    method: "get"
  });

  if (buildings) {
    yield put(renderBuildings(buildings));
  }
}

function* createLectureHall(action) {
  const {
    universityId,
    buildingName,
    lectureHallName,
    placeNumber
  } = action.payload;

  const response = yield call(processHttpCall, {
    url: LECTURE_HALLS,
    method: "post",
    data: {
      universityId: universityId,
      buildingName: buildingName,
      lectureHallName: lectureHallName,
      placeNumber: placeNumber
    }
  });

  if (response) {
    yield call(loadBuildings);
    yield call(loadLectureHalls);
  }
}
