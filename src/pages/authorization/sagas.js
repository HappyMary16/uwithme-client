import { call, put, takeEvery } from 'redux-saga/effects';

import http from '../../services/http';
import { AVATAR } from '../../constants/serverApi';
import { addError, endFetching, startFetching } from '../navigation/actions';
import { UPLOAD_AVATAR } from '../user/actions';
import { downloadMyAvatar } from './signIn/actions';

export function* authorizationWatcher() {
  yield takeEvery(UPLOAD_AVATAR, action => uploadAvatar(action));
}

function* uploadAvatar(action) {
  try {
    yield put(startFetching());

    const { avatar } = action.payload;
    const formData = new FormData();

    formData.append('file', avatar, 'avatar.png');

    let response = yield call(http, {
      url: AVATAR,
      method: 'post',
      data: formData,
      isFile: true
    });

    if (response && response.status === 200) {
      yield put(downloadMyAvatar());
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
