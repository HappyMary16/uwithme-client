import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import {
  findStudentsByGroupId,
  findStudentsByTeacherId,
  findStudentsWithoutGroupByUniversityId,
  findTeachersByGroupId,
  GET_AVATAR,
  GET_LESSONS_BY_USER_ID,
  GET_TEACHERS_BY_UNIVERSITY_ID,
  PUT_ADD_STUDENT_TO_GROUP,
  removeStudentFromGroupByStudentId,
  UPDATE_AVATAR
} from '../../constants/serverApi';
import {
  ADD_STUDENT_TO_GROUP,
  FIND_LESSONS_FOR_USER,
  LOAD_AVATAR,
  LOAD_STUDENTS_BY_GROUP_ID,
  LOAD_STUDENTS_BY_TEACHER_ID,
  LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID,
  LOAD_TEACHERS_BY_GROUP_ID,
  LOAD_TEACHERS_BY_UNIVERSITY_ID,
  loadAvatar,
  REMOVE_STUDENT_FROM_GROUP,
  renderAvatar,
  renderLessonsForUser,
  renderUsers,
  UPLOAD_AVATAR
} from './actions';
import { arrayBufferToDataUrl } from '../../utils/FileUtil';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, action => getTeachersByUniversityId(action));
  yield takeEvery(LOAD_TEACHERS_BY_GROUP_ID, action => getTeachersByGroupId(action));
  yield takeEvery(FIND_LESSONS_FOR_USER, action => findLessonsByUsername(action));
  yield takeEvery(LOAD_STUDENTS_BY_TEACHER_ID, action => getStudentsByTeacherId(action));
  yield takeEvery(LOAD_STUDENTS_BY_GROUP_ID, action => getStudentsByGroupId(action));
  yield takeEvery(REMOVE_STUDENT_FROM_GROUP, action => removeStudentFromGroup(action));
  yield takeEvery(LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID, action => getStudentsWithoutGroupByUniversityId(action));
  yield takeEvery(ADD_STUDENT_TO_GROUP, action => addStudentToGroup(action));
  yield takeEvery(UPLOAD_AVATAR, action => uploadAvatar(action));
  yield takeEvery(LOAD_AVATAR, action => loadAvatar(action));
}

function* getTeachersByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const users = yield call(http, {
      url: GET_TEACHERS_BY_UNIVERSITY_ID + universityId,
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

function* getTeachersByGroupId(action) {
  try {
    yield put(startFetching());
    const { groupId } = action.payload;

    const users = yield call(http, {
      url: findTeachersByGroupId(groupId),
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
      url: GET_LESSONS_BY_USER_ID + username,
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

function* getStudentsByTeacherId(action) {
  try {
    yield put(startFetching());
    const { teacherId } = action.payload;

    const users = yield call(http, {
      url: findStudentsByTeacherId(teacherId),
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
        url: findStudentsByGroupId(groupId),
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
      url: removeStudentFromGroupByStudentId(studentId),
      method: 'put'
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
        url: findStudentsWithoutGroupByUniversityId(universityId),
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
        url: PUT_ADD_STUDENT_TO_GROUP,
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

function* uploadAvatar(action) {
  try {
    yield put(startFetching());

    const { userId, avatar } = action.payload;
    const formData = new FormData();

    formData.append('file', avatar, 'avatar.png');

    //TODO fix url
    yield call(http, {
      url: UPDATE_AVATAR + userId,
      method: 'post',
      data: formData,
      isFile: true
    });
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
    yield call(addAvatarToUser, user.id);
  }
}

function* addAvatarToUser(userId) {
  const response = yield call(http, {
    url: GET_AVATAR + userId,
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