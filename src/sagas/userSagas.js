import { call, put, takeEvery } from 'redux-saga/effects';
import { authService } from '../services/http';
import {
  ADMINS,
  AVATAR,
  GROUP_STUDENT_ID,
  ROLES,
  STUDENT_GROUP,
  STUDENTS,
  STUDENTS_BY_GROUP_ID,
  STUDENTS_WITHOUT_GROUP,
  TEACHERS,
  USERS
} from '../constants/serverApi';
import { arrayBufferToDataUrl } from '../utils/FileUtil';
import {
  ADD_STUDENT_TO_GROUP,
  DELETE_USER,
  DOWNLOAD_MY_AVATAR,
  downloadMyAvatar,
  GET_ADMINS,
  GET_STUDENTS,
  GET_TEACHERS, GET_USERS_BY_PARAMS,
  LOAD_STUDENTS_BY_GROUP_ID,
  LOAD_STUDENTS_WITHOUT_GROUP,
  REMOVE_STUDENT_FROM_GROUP,
  RENDER_USERS,
  renderAvatar,
  renderMyAvatar,
  renderUser,
  renderUsers,
  UN_ASSIGN_ROLE,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '../actions/userActions';
import { loadUniversity } from '../actions/universityActions';
import { loadInstitute } from '../actions/instituteActions';
import { loadDepartment } from '../actions/departmentActions';
import { loadGroup } from '../actions/groupActions';
import { processHttpCall } from './rootSaga';
import { signInSuccess, signOut } from '../actions/authActions';
import { STUDENT, TEACHER } from '../constants/userRoles';

export function* usersWatcher() {
  yield takeEvery(GET_ADMINS, getAdmins);
  yield takeEvery(UN_ASSIGN_ROLE, unAssignRole);
  yield takeEvery(GET_TEACHERS, getTeachers);
  yield takeEvery(GET_STUDENTS, getStudents);
  yield takeEvery(GET_USERS_BY_PARAMS, getUsersByParams)

  yield takeEvery(RENDER_USERS, downloadAvatars);

  yield takeEvery(DOWNLOAD_MY_AVATAR, processDownloadMyAvatar);
  yield takeEvery(UPLOAD_AVATAR, uploadAvatar);

  yield takeEvery(LOAD_STUDENTS_BY_GROUP_ID, getStudentsByGroupId);
  yield takeEvery(REMOVE_STUDENT_FROM_GROUP, removeStudentFromGroup);
  yield takeEvery(
    LOAD_STUDENTS_WITHOUT_GROUP,
    getStudentsWithoutGroupByUniversityId
  );
  yield takeEvery(ADD_STUDENT_TO_GROUP, addStudentToGroup);

  yield takeEvery(DELETE_USER, deleteUser);
  yield takeEvery(UPDATE_USER, updateUser);
}

function* getAdmins() {
  const response = yield call(processHttpCall, {
    url: ADMINS,
    method: "get"
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* unAssignRole(action) {
  const { userId, role } = action.payload;

  const response = yield call(processHttpCall, {
    url: USERS + userId + ROLES + role,
    method: "delete"
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* getTeachers() {
  const response = yield call(processHttpCall, {
    url: TEACHERS,
    method: "get"
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* getUsersByParams(action) {
  const response = yield call(processHttpCall, {
    url: USERS,
    method: "get",
    params: action.payload
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* getStudents() {
  const response = yield call(processHttpCall, {
    url: STUDENTS,
    method: "get"
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* downloadAvatarForUser(userId) {
  const response = yield call(processHttpCall, {
    url: AVATAR + userId,
    method: "get",
    loadFile: true,
    ignoreNotFound: true
  });

  if (response) {
    yield put(renderAvatar(userId, arrayBufferToDataUrl(response)));
  }
}

function* downloadAvatars(action) {
  for (let i = 0; i < action.payload.users.length; i++) {
    const user = action.payload.users[i];
    yield call(downloadAvatarForUser, user.id);
  }
}

function* processDownloadMyAvatar() {
  if (!authService.hasRole(STUDENT) && !authService.hasRole(TEACHER)) {
    return;
  }

  const response = yield call(processHttpCall, {
    url: AVATAR,
    method: "get",
    loadFile: true,
    ignoreNotFound: true
  });

  if (response) {
    yield put(renderMyAvatar(arrayBufferToDataUrl(response)));
  }
}

function* uploadAvatar(action) {
  const { avatar } = action.payload;
  const formData = new FormData();

  formData.append("file", avatar, "avatar.png");

  let response = yield call(processHttpCall, {
    url: AVATAR,
    method: "post",
    data: formData,
    isFile: true
  });

  if (response) {
    yield put(downloadMyAvatar());
  }
}

function* getStudentsByGroupId(action) {
  const { groupId } = action.payload;

  if (groupId) {
    const response = yield call(processHttpCall, {
      url: STUDENTS_BY_GROUP_ID + groupId,
      method: "get"
    });

    if (response) {
      yield put(renderUsers(response));
    }
  }
}

function* removeStudentFromGroup(action) {
  const { studentId } = action.payload;

  const response = yield call(processHttpCall, {
    url: GROUP_STUDENT_ID + studentId,
    method: "delete"
  });

  if (response) {
    yield put(renderUser(response));
  }
}

function* getStudentsWithoutGroupByUniversityId() {
  const response = yield call(processHttpCall, {
    url: STUDENTS_WITHOUT_GROUP,
    method: "get"
  });

  if (response) {
    yield put(renderUsers(response));
  }
}

function* addStudentToGroup(action) {
  const { studentIds, groupId } = action.payload;

  if (studentIds && groupId) {
    const response = yield call(processHttpCall, {
      url: STUDENT_GROUP,
      method: "put",
      data: {
        studentsIds: studentIds,
        groupId: groupId
      }
    });

    if (response) {
      yield put(renderUsers(response));
    }
  }
}

function* deleteUser() {
  const response = yield call(processHttpCall, {
    url: USERS,
    method: "delete"
  });

  if (response) {
    //TODO: tru without logout
    authService.logout();
    yield put(signOut());
  }
}

function* updateUser(action) {
  const { university, institute, department, group } = action.payload;

  const response = yield call(processHttpCall, {
    url: USERS,
    method: "put",
    data: {
      universityId: university && university.value,
      instituteId: institute && institute.value,
      departmentId: department && department.value,
      groupId: group && group.value
    }
  });

  if (response) {
    yield put(signInSuccess(response));
    yield put(loadUniversity());
    yield put(loadInstitute());
    yield put(loadDepartment());
    yield put(loadGroup());
  }
}
