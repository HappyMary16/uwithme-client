import { call, put, takeEvery } from 'redux-saga/effects';
import { BUILDINGS, LECTURE_HALLS } from '../constants/serverApi';
import {
  CREATE_LECTURE_HALL,
  LOAD_BUILDINGS,
  LOAD_LECTURE_HALLS,
  renderBuilding,
  renderBuildings,
  renderLectureHall,
  renderLectureHalls
} from '../actions/lectureHallActions';
import { processHttpCall } from './rootSaga';

export function* lectureHallWatcher() {
  yield takeEvery(LOAD_LECTURE_HALLS, () => loadLectureHalls());
  yield takeEvery(LOAD_BUILDINGS, () => loadBuildings());
  yield takeEvery(CREATE_LECTURE_HALL, action => createLectureHall(action));
}

function* loadLectureHalls() {
  const response = yield call(processHttpCall, {
    url: LECTURE_HALLS,
    method: 'get'
  });

  if (response) {
    yield put(renderLectureHalls(response));
  }
}

function* loadBuildings() {
  const buildings = yield call(processHttpCall, {
    url: BUILDINGS,
    method: 'get'
  });

  if (buildings) {
    yield put(renderBuildings(buildings));
  }
}

function* createBuilding(action) {
  const response = yield call(processHttpCall, {
    url: BUILDINGS,
    method: 'post',
    data: action.payload
  });

  if (response) {
    yield put(renderBuilding(response));
    return response;
  }
}

function* createLectureHall(action) {
  const { buildingId } = action.payload;

  if (!buildingId) {
    const building = yield call(createBuilding, action);
    action.payload.buildingId = building.id;
  }

  const response = yield call(processHttpCall, {
    url: LECTURE_HALLS,
    method: 'post',
    data: action.payload
  });

  if (response) {
    yield put(renderLectureHall(response));
  }
}
