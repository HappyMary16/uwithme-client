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
  while (true) {
    const {
      firstName,
      lastName,
      surname,
      username,
      password,
      confirmPassword,
      phone,
      email,
      userRole,
      studentId,
      scienceDegree,
      institute,
      department,
      group
    } = yield take(SIGN_UP_REQUEST);
    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      surname: surname,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
      email: email,
      role: userRole,
      studentId: studentId,
      scienceDegreeId: scienceDegree,
      instituteId: institute,
      departmentId: department,
      studyGroupId: group
    });
    const signUpResponse = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });

    yield put({
      type: SIGN_IN_REQUEST,
      username: signUpResponse.data.username,
      password: signUpResponse.data.password
    });
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

      console.log(response.data.token);
      localStorage.setItem('AuthToken', response.data.token);

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
