import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../navigation/actions';
import http from '../../services/http';
import {
  AVATAR,
  LESSONS_BY_USERNAME,
  TEACHERS,
  USERS
} from '../../constants/serverApi';
import {
  FIND_LESSONS_FOR_USER,
  GET_STUDENTS_FRIENDS,
  GET_TEACHERS_FRIENDS,
  LOAD_TEACHERS_BY_UNIVERSITY_ID,
  RENDER_USERS,
  renderAvatar,
  renderLessonsForUser,
  renderUsers
} from './actions';
import { arrayBufferToDataUrl } from '../../utils/FileUtil';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, () =>
    getTeachersByUniversityId()
  );
  yield takeEvery(GET_STUDENTS_FRIENDS, getStudentsFriends);
  yield takeEvery(FIND_LESSONS_FOR_USER, action =>
    findLessonsByUsername(action)
  );
  yield takeEvery(GET_TEACHERS_FRIENDS, getTeachersFriends);

  yield takeEvery(RENDER_USERS, action => downloadAvatars(action));
}

function* getTeachersByUniversityId() {
  try {
    yield put(startFetching());

    const users = yield call(http, {
      url: TEACHERS,
      method: 'get'
    });

    if (users) {
      yield put(renderUsers(users.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getStudentsFriends() {
  try {
    yield put(startFetching());

    const users = yield call(http, {
      url: USERS,
      method: 'get'
    });

    if (users) {
      yield put(renderUsers(users.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* findLessonsByUsername(action) {
  try {
    yield put(startFetching());

    const { username } = action.payload;

    const response = yield call(http, {
      url: LESSONS_BY_USERNAME + username,
      method: 'get'
    });

    if (response) {
      yield put(renderLessonsForUser(response.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getTeachersFriends() {
  try {
    yield put(startFetching());

    const users = yield call(http, {
      url: USERS,
      method: 'get'
    });

    if (users) {
      yield put(renderUsers(users.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* downloadAvatars(users) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    yield call(downloadAvatarForUser, user.id);
  }
}

function* downloadAvatarForUser(userId) {
  const response = yield call(http, {
    url: AVATAR + userId,
    method: 'get',
    loadFile: true
  });

  if (response) {
    yield put(renderAvatar(userId, arrayBufferToDataUrl(response.data)));
  } else {
    return { userId };
  }
}
