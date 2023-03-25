import {call, put, takeEvery} from 'redux-saga/effects';

import {authService} from '../services/authService';
import http from '../services/http';
import {SIGN_IN, SIGN_UP} from '../constants/serverApi';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  signInSuccess,
  updateRegistrationComplete
} from '../actions/authActions';
import {addError} from '../actions/messageAction';
import {downloadMyAvatar} from '../actions/userActions';
import {processHttpCall} from './rootSaga';
import {endFetching, startFetching} from '../actions/navigationActions';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);

  yield takeEvery(SIGN_IN_REQUEST, processSignIn);
  yield takeEvery(SIGN_IN_SUCCESS, processSignInSuccess);
}

function* signUp(action) {
  const response = yield call(processHttpCall, {
    url: SIGN_UP,
    method: 'post',
    data: action.payload
  });

  if (response) {
    yield authService.tryToRefresh();
    yield put(signInSuccess(response));
  }
}

function* processSignIn() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'get'
    });

    if (!!response && response.status === 200) {
      yield put(signInSuccess(response.data));
    } else if (!!response && response.status === 404) {
      yield put(updateRegistrationComplete());
    } else {
      yield put(addError(response));
    }
  } catch (error) {
    yield put(addError(error));
  } finally {
    yield put(endFetching());
  }
}

function* processSignInSuccess() {
  yield put(downloadMyAvatar());
}
