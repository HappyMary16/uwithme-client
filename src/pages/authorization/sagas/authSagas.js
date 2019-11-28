import { call, put, take } from 'redux-saga/effects';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_IN_ERROR
} from '../actions/authActions';

import http from '../../../services/http';

export function* authorize(username, password) {
  try {
    const endpoint = 'login';

    let data = JSON.stringify({
      username: username,
      password: password
    });

    const response = yield call(http, {
      url: endpoint,
      method: 'post',
      data: data
    });

    return response;
  } catch (error) {
    yield put({ type: SIGN_IN_ERROR, error });
  }
}

export function* loginFlow() {
  while (true) {
    const { username, password } = yield take(SIGN_IN_REQUEST);
    const response = yield call(authorize, username, password);
    if (response) {
      yield put({ type: SIGN_IN_SUCCESS, response });
      localStorage.setItem('AuthToken', response);
      yield take(SIGN_OUT);
      localStorage.setItem('AuthToken', null);
      // some actions after logout
      // yield put({ type: 'SAVE_TOKEN' });
    }
  }
}
