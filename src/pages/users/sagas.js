import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import {
  AVATAR,
  GROUP_STUDENT_ID,
  LESSONS_BY_USERNAME,
  STUDENT_GROUP,
  STUDENTS_BY_GROUP_ID,
  STUDENTS_WITHOUT_GROUP,
  TEACHERS,
  USERS
} from '../../constants/serverApi';
import {
  ADD_STUDENT_TO_GROUP,
  FIND_LESSONS_FOR_USER,
  GET_STUDENTS_FRIENDS,
  GET_TEACHERS_FRIENDS,
  LOAD_STUDENTS_BY_GROUP_ID,
  LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID,
  LOAD_TEACHERS_BY_UNIVERSITY_ID,
  REMOVE_STUDENT_FROM_GROUP,
  renderAvatar,
  renderLessonsForUser,
  renderUsers
} from './actions';
import { arrayBufferToDataUrl } from '../../utils/FileUtil';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, action => getTeachersByUniversityId(action));
  yield takeEvery(GET_STUDENTS_FRIENDS, () => getStudentsFriends());
  yield takeEvery(FIND_LESSONS_FOR_USER, action => findLessonsByUsername(action));
  yield takeEvery(GET_TEACHERS_FRIENDS, () => getTeachersFriends());
  yield takeEvery(LOAD_STUDENTS_BY_GROUP_ID, action => getStudentsByGroupId(action));
  yield takeEvery(REMOVE_STUDENT_FROM_GROUP, action => removeStudentFromGroup(action));
  yield takeEvery(LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID, action => getStudentsWithoutGroupByUniversityId(action));
  yield takeEvery(ADD_STUDENT_TO_GROUP, action => addStudentToGroup(action));
}

function* getTeachersByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const users = yield call(http, {
      url: TEACHERS + universityId,
      method: 'get'
    });

    if (users) {
      yield call(renderUsersWithAvatars, users.data);
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
      yield call(renderUsersWithAvatars, users.data);
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

    const {
      username
    } = action.payload;

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
      yield call(renderUsersWithAvatars, users.data);
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getStudentsByGroupId(action) {
  try {
    yield put(startFetching());
    const { groupId } = action.payload;

    if (groupId) {
      const users = yield call(http, {
        url: STUDENTS_BY_GROUP_ID + groupId,
        method: 'get'
      });

      if (users) {
        yield call(renderUsersWithAvatars, users.data);
      }
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* removeStudentFromGroup(action) {
  try {
    yield put(startFetching());
    const { studentId } = action.payload;

    const users = yield call(http, {
      url: GROUP_STUDENT_ID + studentId,
      method: 'delete'
    });

    if (users) {
      yield call(renderUsersWithAvatars, users.data);
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getStudentsWithoutGroupByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    if (universityId) {
      const users = yield call(http, {
        url: STUDENTS_WITHOUT_GROUP + universityId,
        method: 'get'
      });

      if (users) {
        yield call(renderUsersWithAvatars, users.data);
      }
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* addStudentToGroup(action) {
  try {
    yield put(startFetching());
    const { studentIds, groupId } = action.payload;

    if (studentIds && groupId) {
      const users = yield call(http, {
        url: STUDENT_GROUP,
        method: 'put',
        data: {
          studentsIds: studentIds,
          groupId: groupId
        }
      });

      if (users) {
        yield call(renderUsersWithAvatars, users.data);
      }
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* renderUsersWithAvatars(users) {
  yield put(renderUsers(users));
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
    console.log(response);
    yield put(renderAvatar(userId, arrayBufferToDataUrl(response.data)));
  } else {
    return { userId };
  }
}