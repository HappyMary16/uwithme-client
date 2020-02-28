import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_SUBJECTS } from '../actions';
import http from '../../../services/http';
import {
  POST_SUBJECTS,
  UPLOAD_MULTIPLE_FILES
} from '../../../common/constants/serverApi';
import { SAVE_SUBJECTS, UPLOAD_REQUEST, UPLOAD_SUCCESS } from './actions';

export function* addFilesAndSubjectsWatcher() {
  yield takeEvery(SAVE_SUBJECTS, action => saveSubject(action));
  yield takeEvery(UPLOAD_REQUEST, action => uploadFiles(action));
}

function* saveSubject(action) {
  const { username, subjectName } = action;

  yield call(http, {
    url: POST_SUBJECTS + username + '/' + subjectName,
    method: 'post'
  });

  yield put({ type: LOAD_SUBJECTS, username });
}

function* uploadFiles(action) {
  const { files, username, subjectName, fileType } = action;

  let formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    formData.append('files', files[index]);
  }

  let response = yield call(http, {
    url: UPLOAD_MULTIPLE_FILES + username + '/' + subjectName + '/' + fileType,
    method: 'post',
    data: formData,
    isFile: true
  });

  yield put({ type: UPLOAD_SUCCESS, response });
}
