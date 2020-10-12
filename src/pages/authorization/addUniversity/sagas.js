import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_UNIVERSITY } from './actions';
import { endFetching, startFetching } from '../../navigation/actions';
import { signInError, signInSuccess } from '../signIn/actions';
import { UNIVERSITIES } from '../../../constants/serverApi';
import http from '../../../services/http';

export function* addUniversityWatcher() {
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
      yield put(signInSuccess(response.data));
    } else {
      yield put(signInError(response));
    }
  } catch (error) {
    alert(error);
    yield put(signInError(error));
  } finally {
    yield put(endFetching());
  }
}
