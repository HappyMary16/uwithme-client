import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../pages/navigation/actions';
import http from '../services/http';
import { GET_LESSONS_BY_GROUP_ID, LESSONS } from '../constants/serverApi';
import { addError } from '../actions/messageAction';
import { LESSONS_BY_USERNAME } from '../constants/serverApi';
import {
  FIND_LESSONS_BY_GROUP_ID,
  FIND_LESSONS_BY_USER_NAME,
  FIND_LESSONS_FOR_USER,
  renderLessons, renderLessonsForUser
} from '../actions/scheduleActions';

export function* scheduleWatcher() {
  yield takeEvery(FIND_LESSONS_BY_GROUP_ID, action =>
    findLessonsByGroupId(action)
  );
  yield takeEvery(FIND_LESSONS_BY_USER_NAME, findLessons);
  yield takeEvery(FIND_LESSONS_FOR_USER, action =>
    findLessonsByUsername(action)
  );
}

function* findLessonsByGroupId(action) {
  try {
    yield put(startFetching());

    const { groupId } = action.payload;

    const response = yield call(http, {
      url: GET_LESSONS_BY_GROUP_ID + groupId,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderLessons(response.data));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* findLessons() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: LESSONS,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderLessons(response.data));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* findLessonsByUsername(action) {
  try {
    yield put(startFetching());

    const { id } = action.payload;

    const response = yield call(http, {
      url: LESSONS_BY_USERNAME + id,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderLessonsForUser(response.data));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
