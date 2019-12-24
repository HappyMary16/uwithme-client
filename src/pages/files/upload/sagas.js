import { call, take, put } from 'redux-saga/effects';
import { UPLOAD_REQUEST, UPLOAD_SUCCESS } from './actions';
import http from '../../../services/http';

export function* uploadRequestWatcherSaga() {
  while (true) {
    const { files, subjectName, fileType } = yield take(UPLOAD_REQUEST);
    let response = yield call(
      uploadMultipleFiles,
      files,
      subjectName,
      fileType
    );

    yield put({ type: UPLOAD_SUCCESS, response });
  }
}

export function* uploadMultipleFiles(files, subjectName, fileType) {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append('files', files[index]);
  }

  console.log(subjectName);
  return yield call(http, {
    url: '/uploadMultipleFiles/' + subjectName + '/' + fileType,
    method: 'post',
    data: formData,
    isFile: true
  });
}
