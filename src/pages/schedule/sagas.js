import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE_LESSON, FIND_LESSONS_BY_GROUP_ID, FIND_LESSONS_BY_USER_NAME, renderLessons } from './actions';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { GET_LESSONS_BY_GROUP_ID, LESSONS } from '../../constants/serverApi';

export function* scheduleOperationWatcher() {
  yield takeEvery(FIND_LESSONS_BY_GROUP_ID, action => findLessonsByGroupId(action));
  yield takeEvery(FIND_LESSONS_BY_USER_NAME, () => findLessons());
  yield takeEvery(DELETE_LESSON, action => deleteLesson(action));
}

function* findLessonsByGroupId(action) {
  try {
    yield put(startFetching());

    const {
      groupId
    } = action.payload;

    const response = yield call(http, {
      url: GET_LESSONS_BY_GROUP_ID + groupId,
      method: 'get'
    });

    if (response) {
      yield put(renderLessons(response.data));
    }

  } catch (e) {
    alert(e);
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

    if (response) {
      yield put(renderLessons(response.data));
    }

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* deleteLesson(action) {
  try {
    yield put(startFetching());
    const { lesson, groups } = action.payload;
    let data = {
      lessonId: lesson.id
    };

    if (groups.length !== lesson.groups.length) {
      data.groups = groups;
    }

    const response = yield call(http, {
      url: LESSONS,
      method: 'delete',
      data
    });

    if (response) {
      yield put(renderLessons(response.data));
    }

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}