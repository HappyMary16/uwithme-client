import { call, put, take } from 'redux-saga/effects';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_IN_ERROR,
  SIGN_UP_REQUEST
} from '../actions/authActions';

import history from '../../../utils/history';
import http from '../../../services/http';
import { SIGN_IN, SIGN_UP } from '../../../constants/serverApi';
import { USER_HOME } from '../../../constants/links';

export function* signIn(username, password) {
  try {
    let data = JSON.stringify({
      username: username,
      password: password
    });

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'post',
      data: data
    });

    return response;
  } catch (error) {
    yield put({ type: SIGN_IN_ERROR, error });
  }
}

export function* signUp() {
  const {
    username,
    password,
    userType,
    institute,
    department,
    group
  } = yield take(SIGN_UP_REQUEST);
  let data = JSON.stringify({
    username: username,
    password: password,
    userType: userType,
    institute: institute,
    department: department,
    group: group
  });

  const response = yield call(http, {
    url: SIGN_UP,
    method: 'post',
    data: data
  });

  if (response) {
    yield put({ type: SIGN_IN_SUCCESS, response });
    localStorage.setItem('AuthToken', response.data);
    yield take(SIGN_OUT);
    localStorage.setItem('AuthToken', null);
    // some actions after logout
    // yield put({ type: 'SAVE_TOKEN' });
  }
}

export function* loginFlow() {
  while (true) {
    const { username, password } = yield take(SIGN_IN_REQUEST);

    //start connect
    const response = yield call(signIn, username, password);
    // if cannot connect wait 10000s

    if (response.status === 200) {
      yield put({ type: SIGN_IN_SUCCESS, response });

      localStorage.setItem('AuthToken', response.data);

      history.push(USER_HOME);

      yield take(SIGN_OUT);
      localStorage.setItem('AuthToken', null);
      // some actions after logout
      //yield put({ type: 'SAVE_TOKEN' });
    } else {
      yield put({ type: SIGN_IN_ERROR, response });
    }
  }
}