import {put, takeEvery} from 'redux-saga/effects';
import {SIGN_IN_SUCCESS} from '../actions/authActions';
import {downloadMyAvatar} from '../actions/userActions';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_IN_SUCCESS, processSignInSuccess);
}

function* processSignInSuccess() {
  yield put(downloadMyAvatar());
}
