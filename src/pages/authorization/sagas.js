import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_REQUEST
} from './actions';

import { history } from '../../store/Store';
import http from '../../services/http';
import { SIGN_IN, SIGN_UP } from '../../common/constants/serverApi';
import { USER_HOME } from '../../common/constants/links';
import { endFetching, startFetching } from '../../common/actions';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, action => signUp(action));
  yield takeEvery(SIGN_IN_REQUEST, action => signIn(action));
  yield takeEvery(SIGN_OUT, signOut);
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
      studyGroupId: action.group
    });

    const response = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });
    if (response.status === 200) {
      yield call(signInSuccess, response);
    } else {
      yield call(signInError, response);
    }
    //TODO reaction on non-success result
  } catch (e) {
    yield call(signInError, e);
    //TODO message about error
  } finally {
    yield put(endFetching());
  }
}

function signOut() {
  localStorage.setItem('AuthToken', null);
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

    console.log(response);
    if (response.status === 200) {
      yield call(signInSuccess, response);
    } else {
      yield call(signInError, response);
    }
  } catch (error) {
    yield call(signInError, error);
  } finally {
    yield put(endFetching());
  }
}

function* signInSuccess(response) {
  yield put({ type: SIGN_IN_SUCCESS, response });
  localStorage.setItem('AuthToken', response.data.token);
  history.push(USER_HOME);
}

function* signInError(message) {
  localStorage.setItem('AuthToken', null);
  console.log('error');
  yield put({ type: SIGN_IN_ERROR, message });
}
