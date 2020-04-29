import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_LECTURE_HALL,
  lectureHallCreated,
  LOAD_BUILDINGS,
  LOAD_LECTURE_HALLS,
  renderBuildings,
  renderLectureHalls
} from './action';
import { endFetching, startFetching } from '../../../common/actions';
import http from '../../../services/http';
import { GET_BUILDINGS, GET_LECTURE_HALLS } from '../../../constants/serverApi';

export function* lectureHallWatcher() {
  yield takeEvery(LOAD_LECTURE_HALLS, action => loadLectureHalls(action));
  yield takeEvery(LOAD_BUILDINGS, action => loadBuildings(action));
  yield takeEvery(CREATE_LECTURE_HALL, action => createLectureHall(action));
}

function* loadLectureHalls(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const lectureHalls = yield call(http, {
      url: GET_LECTURE_HALLS + universityId,
      method: 'get'
    });

    if (lectureHalls) {
      yield put(renderLectureHalls(lectureHalls.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* loadBuildings(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const buildings = yield call(http, {
      url: GET_BUILDINGS + universityId,
      method: 'get'
    });

    if (buildings) {
      yield put(renderBuildings(buildings.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* createLectureHall(action) {
  try {
    yield put(startFetching());

    const { universityId, buildingName, lectureHallName, placeNumber } = action.payload;

    const response = yield call(http, {
      url: GET_LECTURE_HALLS,
      method: 'post',
      data: {
        universityId: universityId,
        buildingName: buildingName,
        lectureHallName: lectureHallName,
        placeNumber: placeNumber
      }
    });

    if (response && response.status === 200) {
      yield put(lectureHallCreated(response.data));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
  } finally {
    yield put(endFetching());
  }
}