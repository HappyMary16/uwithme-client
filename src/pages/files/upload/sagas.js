import { call, take, put, takeEvery } from 'redux-saga/effects';
import {
  GET_FILES_BY_SUBJECT,
  LOAD_SUBJECTS,
  RENDER_FILES,
  RENDER_SUBJECTS,
  SAVE_SUBJECTS,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS
} from './actions';
import http from '../../../services/http';
import {
  DOWNLOAD_FILE,
  GET_FILES,
  GET_SUBJECTS,
  POST_SUBJECTS,
  UPLOAD_MULTIPLE_FILES
} from '../../../common/constants/serverApi';

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
    url: UPLOAD_MULTIPLE_FILES + subjectName + '/' + fileType,
    method: 'post',
    data: formData,
    isFile: true
  });
}

export function* downloadFilesBySubject() {
  yield takeEvery(GET_FILES_BY_SUBJECT, action => downloadFiles(action));
}

function* downloadFiles(action) {
  try {
    const { userName, subjectId } = action;

    const response = yield call(http, {
      url: GET_FILES + userName + '/' + subjectId,
      method: 'get',
      isFile: true
    });

    yield put({ type: RENDER_FILES, response });
  } catch (e) {
    //TODO add error
  }
}

export function* loadSubjects() {
  const { teacherUsername } = yield take(LOAD_SUBJECTS);
  const response = yield call(http, {
    url: GET_SUBJECTS + teacherUsername,
    method: 'get'
  });

  yield put({ type: RENDER_SUBJECTS, response });
}

export function* saveSubject() {
  const { teacherUsername, subjectName } = yield take(SAVE_SUBJECTS);
  yield call(http, {
    url: POST_SUBJECTS + teacherUsername + '/' + subjectName,
    method: 'post'
  });

  yield put({ type: LOAD_SUBJECTS, teacherUsername: teacherUsername });
}

export function* openFile(fileId) {
  yield call(http, {
    url: DOWNLOAD_FILE + fileId,
    method: 'get'
  });
}
