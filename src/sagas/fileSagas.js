import { call, fork, put, takeEvery } from "redux-saga/effects";
import http from "../services/http";
import { FILES, FILES_ACCESS, SUBJECTS } from "../constants/serverApi";
import { setMessage } from "../actions/messageAction";
import {
  ADD_ACCESS_TO_FILES,
  DOWNLOAD_FILES,
  LOAD_SUBJECTS,
  LOAD_SUBJECTS_AND_FILES,
  renderFiles,
  renderSubjects,
  UPLOAD_REQUEST,
  uploadProgress,
  uploadSuccess
} from "../actions/fileActions";
import { history } from "../store/Store";
import { END, eventChannel } from "redux-saga";
import { processHttpCall } from "./rootSaga";

export function* fileOperationWatcher() {
  yield takeEvery(LOAD_SUBJECTS_AND_FILES, () => loadSubjectsWithFiles());
  yield takeEvery(LOAD_SUBJECTS, action => loadSubjects(action));
  yield takeEvery(DOWNLOAD_FILES, action => downloadFile(action));

  yield takeEvery(ADD_ACCESS_TO_FILES, action => addAccessToFiles(action));

  yield takeEvery(UPLOAD_REQUEST, action => uploadFiles(action));
}

function* downloadFiles() {
  const response = yield call(processHttpCall, {
    url: FILES,
    method: "get",
    isFile: true
  });

  if (response) {
    yield put(renderFiles(response));
  }
}

function* loadSubjectsWithFiles() {
  yield call(loadSubjects);
  yield call(downloadFiles);
}

function* loadSubjects() {
  const response = yield call(processHttpCall, {
    url: SUBJECTS,
    method: "get"
  });

  if (response) {
    yield put(renderSubjects(response));
  }
}

function* downloadFile(action) {
  const { fileId, fileName, loading } = action;

  let response = yield call(http, {
    url: FILES + fileId,
    method: "get",
    loadFile: true
  });

  let blob = new Blob([response.data], {
    type: response.headers["content-type"]
  });
  let url = URL.createObjectURL(blob);

  if (loading) {
    saveFile(url, fileName);
  } else {
    openFile(url);
  }
}

function openFile(url) {
  let newWindow = window.open("/files/loading");
  newWindow.onload = () => {
    newWindow.location = url;
  };
}

function saveFile(url, fileName) {
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
}

function* addAccessToFiles(action) {
  const { fileIds, groupIds } = action;

  const response = yield call(processHttpCall, {
    url: FILES_ACCESS,
    method: "post",
    data: {
      fileIds: fileIds,
      groupIds: groupIds
    }
  });

  if (response) {
    yield put(setMessage("Доступ надано"));
  }
  history.push(FILES);
}

function* uploadFiles(action) {
  const { files, username, subjectName, fileType } = action;
  let payload = { username, subjectName, fileType };

  for (let index = 0; index < files.length; index++) {
    payload["file"] = files[index];
    try {
      const [uploadPromise, chan] = createUploader(payload);
      yield fork(watchOnProgress, { fileName: payload.file.name, chan: chan });

      const response = yield call(() => uploadPromise);

      if (response) {
        yield put(uploadSuccess(response.data));
        yield put(renderFiles(response));
      }
    } catch (err) {
      put({ type: "ERROR", payload: err });
    }
  }
}

function upload(action, onUploadProgress) {
  const { file, subjectName, fileType } = action;

  let formData = new FormData();
  formData.append("files", file);

  return http({
    url: FILES + subjectName + "/" + fileType,
    method: "post",
    data: formData,
    isFile: true,
    onUploadProgress: onUploadProgress
  });
}

function createUploader(payload) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  const uploadPromise = upload(payload, event => {
    if (event.loaded.total === 1) {
      emit(END);
    }

    emit(100 - ((event.total - event.loaded) / event.total) * 100);
  });

  return [uploadPromise, chan];
}

function* watchOnProgress({ fileName, chan }) {
  yield takeEvery(chan, action => uploadProgressFunc(fileName, action));
}

function* uploadProgressFunc(fileName, action) {
  yield put(uploadProgress(fileName, action));
}
