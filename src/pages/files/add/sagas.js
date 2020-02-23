import { call, put, take, takeEvery } from 'redux-saga/effects';
import { LOAD_SUBJECTS } from '../actions';
import http from '../../../services/http';
import {
  POST_SUBJECTS,
  UPLOAD_MULTIPLE_FILES
} from '../../../common/constants/serverApi';
import { SAVE_SUBJECTS, UPLOAD_REQUEST, UPLOAD_SUCCESS } from './actions';

export function* saveSubjectSaga() {
  yield takeEvery(SAVE_SUBJECTS, action => saveSubject(action));
}

function* saveSubject(action) {
  const { username, subjectName } = action;

  yield call(http, {
    url: POST_SUBJECTS + username + '/' + subjectName,
    method: 'post'
  });

  yield put({ type: LOAD_SUBJECTS, username });
}

export function* uploadMultipleFiles(username, files, subjectName, fileType) {
  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append('files', files[index]);
  }

  return yield call(http, {
    url: UPLOAD_MULTIPLE_FILES + username + '/' + subjectName + '/' + fileType,
    method: 'post',
    data: formData,
    isFile: true
  });
}

export function* uploadRequestWatcherSaga() {
  while (true) {
    const { files, subjectName, fileType, username } = yield take(
      UPLOAD_REQUEST
    );
    let response = yield call(
      uploadMultipleFiles,
      username,
      files,
      subjectName,
      fileType
    );

    yield put({ type: UPLOAD_SUCCESS, response });
  }
}
