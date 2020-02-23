import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_FILES_BY_SUBJECT,
  LOAD_FILES,
  LOAD_SUBJECTS,
  RENDER_FILES,
  RENDER_SUBJECTS
} from './actions';
import http from '../../services/http';
import {
  DOWNLOAD_FILE,
  GET_FILES,
  GET_SUBJECTS
} from '../../common/constants/serverApi';

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
  yield takeEvery(LOAD_SUBJECTS, action => loadSubjectsImpl(action));
}

function* loadSubjectsImpl(action) {
  const { username } = action;
  const response = yield call(http, {
    url: GET_SUBJECTS + username,
    method: 'get'
  });

  yield put({ type: RENDER_SUBJECTS, response });
}

export function* openOrSaveFile() {
  yield takeEvery(LOAD_FILES, action => openFileImpl(action));
}

function* openFileImpl(action) {
  const { fileId, fileName, loading } = action;
  console.log(fileId);
  let response = yield call(http, {
    url: DOWNLOAD_FILE + fileId,
    method: 'get',
    loadFile: true
  });

  let blob = new Blob([response.data], {
    type: response.headers['content-type']
  });
  let url = URL.createObjectURL(blob);

  if (loading) {
    saveFile(url, fileName);
  } else {
    openFile(url);
  }
}

function openFile(url) {
  let newWindow = window.open('/files/loading');
  newWindow.onload = () => {
    newWindow.location = url;
  };
}

function saveFile(url, fileName) {
  let a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
}
