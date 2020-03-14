import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_FILES_BY_USERNAME,
  LOAD_FILES,
  LOAD_SUBJECTS,
  LOAD_SUBJECTS_BY_UNIVERSITY_ID,
  renderFiles,
  renderSubjects
} from './actions';
import http from '../../services/http';
import { DOWNLOAD_FILE, GET_FILES, GET_SUBJECTS, GET_SUBJECTS_BY_UNIVERSITY_ID } from '../../constants/serverApi';
import { endFetching, startFetching } from '../../common/actions';

export function* fileOperationWatcher() {
  yield takeEvery(GET_FILES_BY_USERNAME, action => downloadFiles(action));
  yield takeEvery(LOAD_SUBJECTS, action => loadSubjects(action));
  yield takeEvery(LOAD_SUBJECTS_BY_UNIVERSITY_ID, action => loadSubjectsByUniversityId(action));
  yield takeEvery(LOAD_FILES, action => downloadFile(action));
}

function* downloadFiles(action) {
  try {
    yield put(startFetching());

    const { userName } = action;

    const response = yield call(http, {
      url: GET_FILES + userName,
      method: 'get',
      isFile: true
    });

    yield put(renderFiles(response));
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}

function* loadSubjects(action) {
  try {
    yield put(startFetching());
    const { username } = action;
    const response = yield call(http, {
      url: GET_SUBJECTS + username,
      method: 'get'
    });

    yield put(renderSubjects(response));
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}

function* loadSubjectsByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;
    const response = yield call(http, {
      url: GET_SUBJECTS_BY_UNIVERSITY_ID + universityId,
      method: 'get'
    });

    yield put(renderSubjects(response));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* downloadFile(action) {
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
