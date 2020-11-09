import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DOWNLOAD_MY_AVATAR,
  downloadMyAvatar,
  renderMyAvatar,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  signInSuccess
} from './actions';
import { addError, endFetching, startFetching } from '../../navigation/actions';
import http from '../../../services/http';
import { AVATAR, SIGN_IN } from '../../../constants/serverApi';
import { history } from '../../../store/Store';
import { USER_HOME } from '../../../constants/links';
import { arrayBufferToDataUrl } from '../../../utils/FileUtil';
import { USER_DOES_NOT_HAVE_ACCOUNT } from '../../../constants/errors';

export function* signInWatcher() {
  yield takeEvery(SIGN_IN_REQUEST, processSignIn);
  yield takeEvery(SIGN_IN_SUCCESS, processSignInSuccess);
  yield takeEvery(DOWNLOAD_MY_AVATAR, processDownloadMyAvatar);
}

function* processSignIn() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
    } else if (response && response.status === 404) {
      yield put(addError(USER_DOES_NOT_HAVE_ACCOUNT));
    } else {
      yield put(addError(response));
    }
  } catch (error) {
    yield put(addError(error));
  } finally {
    yield put(endFetching());
  }
}

export function* processSignInSuccess() {
  history.push(USER_HOME);
  yield put(downloadMyAvatar());
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
