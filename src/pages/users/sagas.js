import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import {
  GET_LESSONS_BY_USER_ID,
  GET_TEACHERS_BY_GROUP_ID,
  GET_TEACHERS_BY_UNIVERSITY_ID
} from '../../constants/serverApi';
import {
  FIND_LESSONS_FOR_USER,
  LOAD_TEACHERS_BY_GROUP_ID,
  LOAD_TEACHERS_BY_UNIVERSITY_ID,
  renderLessonsForUser,
  renderTeachers
} from './actions';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, action =>
    getTeachersByUniversityId(action)
  );
  yield takeEvery(LOAD_TEACHERS_BY_GROUP_ID, action =>
    getTeachersByGroupId(action)
  );

  yield takeEvery(FIND_LESSONS_FOR_USER, action => findLessonsByUsername(action));
}

function* getTeachersByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const teachers = yield call(http, {
      url: GET_TEACHERS_BY_UNIVERSITY_ID + universityId,
      method: 'get'
    });

    yield put(renderTeachers(teachers.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getTeachersByGroupId(action) {
  try {
    yield put(startFetching());
    const { groupId } = action.payload;

    const teachers = yield call(http, {
      url: GET_TEACHERS_BY_GROUP_ID(groupId),
      method: 'get'
    });

    yield put(renderTeachers(teachers.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* findLessonsByUsername(action) {
  try {
    yield put(startFetching());

    const {
      username
    } = action.payload;

    const { data } = yield call(http, {
      url: GET_LESSONS_BY_USER_ID + username,
      method: 'get'
    });

    yield put(renderLessonsForUser(data));

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}