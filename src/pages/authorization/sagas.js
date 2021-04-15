import { call, put, takeEvery } from 'redux-saga/effects';

import http from '../../services/http';
import {
  SIGN_IN,
  SIGN_UP
} from '../../constants/serverApi';
import { endFetching, startFetching } from '../navigation/actions';
import {
  setRegistrationComplete,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  signInSuccess
} from './actions';
import { history } from '../../store/Store';
import { PRE_HOME, USER_HOME } from '../../constants/links';
import { addError } from '../../actions/messageAction';
import { downloadMyAvatar } from '../../actions/userActions';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, action => signUp(action));

  yield takeEvery(SIGN_IN_REQUEST, processSignIn);
  yield takeEvery(SIGN_IN_SUCCESS, processSignInSuccess);
}

function* signUp(action) {
  try {
    yield put(startFetching());

    let data = JSON.stringify(action.payload);

    const response = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
      yield put(setRegistrationComplete(true));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
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
      yield put(setRegistrationComplete(false));
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
  if (history.location.pathname.includes(PRE_HOME)) {
    history.push(USER_HOME);
    yield put(downloadMyAvatar());
  }
}
