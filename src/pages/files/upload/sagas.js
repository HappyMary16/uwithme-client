import { call, take } from 'redux-saga/effects';
import { UPLOAD_REQUEST, UPLOAD_SUCCESS } from './actions';
import http from '../../../services/http';
import { put } from '@redux-saga/core/effects';

export function* uploadRequestWatcherSaga() {
  while (true) {
    const { files } = yield take(UPLOAD_REQUEST);
    let response = yield call(uploadMultipleFiles, files);
    console.log(response);
    yield put({ type: UPLOAD_SUCCESS, response });
  }
}

export function* uploadMultipleFiles(files) {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append('files', files[index]);
  }

  return yield call(http, {
    url: '/uploadMultipleFiles',
    method: 'post',
    data: formData,
    isFile: true
  });
}
