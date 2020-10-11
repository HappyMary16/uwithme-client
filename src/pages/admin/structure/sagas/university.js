import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_UNIVERSITY } from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import { UNIVERSITIES } from '../../../../constants/serverApi';
import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from '../../../authorization/actions';
import { history } from '../../../../store/Store';
import { USER_HOME } from '../../../../constants/links';

export function* universityWatcher() {
  yield takeEvery(ADD_UNIVERSITY, action => addUniversity(action));
}

function* addUniversity(action) {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: UNIVERSITIES,
      method: 'post',
      data: {
        universityName: action.payload.universityName,
        username: action.payload.username,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword
      }
    });

    if (response && response.status === 200) {
      yield call(signInSuccess, response);
    } else {
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
  }
}

function* signInError(message) {
  localStorage.setItem('AuthToken', null);
  localStorage.setItem('RefreshToken', null);
  yield put({ type: SIGN_IN_ERROR, message });
}