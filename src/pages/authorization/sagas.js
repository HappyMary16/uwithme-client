import { call, put, takeEvery } from 'redux-saga/effects';
import { SIGN_IN_ERROR, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT, SIGN_UP_REQUEST } from './actions';

import { history } from '../../store/Store';
import http from '../../services/http';
import { AVATAR, SIGN_IN, SIGN_UP } from '../../constants/serverApi';
import { USER_HOME } from '../../constants/links';
import { endFetching, startFetching } from '../../common/actions';
import { renderMyAvatar, UPLOAD_AVATAR } from '../users/actions';
import { arrayBufferToDataUrl } from '../../utils/FileUtil';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, action => signUp(action));
  yield takeEvery(SIGN_IN_REQUEST, action => signIn(action));
  yield takeEvery(SIGN_OUT, signOut);
  yield takeEvery(UPLOAD_AVATAR, action => uploadAvatar(action));
}

function* signUp(action) {
  try {
    yield put(startFetching());

    let data = JSON.stringify({
      firstName: action.firstName,
      lastName: action.lastName,
      surname: action.surname,
      username: action.username,
      password: action.password,
      confirmPassword: action.confirmPassword,
      phone: action.phone,
      email: action.email,
      role: action.userRole,
      studentId: action.studentId,
      scienceDegreeId: action.scienceDegree,
      instituteId: action.institute,
      departmentId: action.department,
      studyGroupId: action.group,
      universityId: action.universityId
    });

    const response = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });
    if (response && response.status === 200) {
      yield call(signInSuccess, response);
    } else {
      alert(response);
      yield call(signInError, response);
    }
    //TODO reaction on non-success result
  } catch (e) {
    alert(e);
    yield call(signInError, e);
    //TODO message about error
  } finally {
    yield put(endFetching());
  }
}

function signOut() {
  localStorage.setItem('AuthToken', null);
  localStorage.setItem('RefreshToken', null);
}

function* signIn(action) {
  try {
    yield put(startFetching());

    let data = JSON.stringify({
      username: action.username,
      password: action.password
    });

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'post',
      data: data
    });

    if (response && response.status === 200) {
      yield call(signInSuccess, response);
    } else {
      alert(response);
      yield call(signInError, response);
    }
  } catch (error) {
    alert(error);
    yield call(signInError, error);
  } finally {
    yield put(endFetching());
  }
}

function* signInSuccess(response) {
  if (response) {
    yield put({ type: SIGN_IN_SUCCESS, response });
    localStorage.setItem('AuthToken', response.data.authToken);
    localStorage.setItem('RefreshToken', response.data.refreshToken);
    history.push(USER_HOME);

    yield call(downloadMyAvatar, response.data.id);
  }
}

function* signInError(message) {
  localStorage.setItem('AuthToken', null);
  localStorage.setItem('RefreshToken', null);
  yield put({ type: SIGN_IN_ERROR, message });
}

function* downloadMyAvatar(userId) {
  const response = yield call(http, {
    url: AVATAR,
    method: 'get',
    loadFile: true
  });

  if (response) {
    yield put(renderMyAvatar(arrayBufferToDataUrl(response.data)));
  } else {
    return { userId };
  }
}


function* uploadAvatar(action) {
  try {
    yield put(startFetching());

    const { userId, avatar } = action.payload;
    const formData = new FormData();

    formData.append('file', avatar, 'avatar.png');

    let response = yield call(http, {
      url: AVATAR,
      method: 'post',
      data: formData,
      isFile: true
    });

    console.log(response);
    if (response && response.status === 200) {
      yield call(downloadMyAvatar, userId);
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

