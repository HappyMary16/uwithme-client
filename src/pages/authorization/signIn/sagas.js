import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DOWNLOAD_MY_AVATAR,
  downloadMyAvatar,
  renderMyAvatar,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  signInError,
  signInSuccess
} from './actions';
import { endFetching, startFetching } from '../../navigation/actions';
import http from '../../../services/http';
import { AVATAR, SIGN_IN } from '../../../constants/serverApi';
import { history } from '../../../store/Store';
import { USER_HOME } from '../../../constants/links';
import { arrayBufferToDataUrl } from '../../../utils/FileUtil';

export function* signInWatcher() {
  yield takeEvery(SIGN_IN_REQUEST, action => processSignIn(action));
  yield takeEvery(SIGN_OUT, processSignOut);
  yield takeEvery(SIGN_IN_ERROR, processSignInError);
  yield takeEvery(SIGN_IN_SUCCESS, action => processSignInSuccess(action));
  yield takeEvery(DOWNLOAD_MY_AVATAR, processDownloadMyAvatar);
}

function processSignOut() {
  localStorage.setItem('AuthToken', null);
  localStorage.setItem('RefreshToken', null);
}

function* processSignIn(action) {
  try {
    yield put(startFetching());

    const { username, password } = action.payload;

    let data = JSON.stringify({
      username,
      password
    });

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'post',
      data: data
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
    } else {
      alert(response);
      yield put(signInError(response));
    }
  } catch (error) {
    alert(error);
    yield put(signInError(error));
  } finally {
    yield put(endFetching());
  }
}

export function* processSignInSuccess(action) {
  const { user } = action.payload;

  localStorage.setItem('AuthToken', user.authToken);
  localStorage.setItem('RefreshToken', user.refreshToken);
  history.push(USER_HOME);

  yield put(downloadMyAvatar());
}

function processSignInError() {
  localStorage.setItem('AuthToken', null);
  localStorage.setItem('RefreshToken', null);
}

function* processDownloadMyAvatar() {
  const response = yield call(http, {
    url: AVATAR,
    method: 'get',
    loadFile: true
  });

  if (response && response.status !== 204) {
    yield put(renderMyAvatar(arrayBufferToDataUrl(response.data)));
  } else {
    return {};
  }
}
