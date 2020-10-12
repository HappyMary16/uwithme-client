import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { renderFiles } from '../files/actions';
import http from '../../../services/http';
import { FILES } from '../../../constants/serverApi';
import { UPLOAD_REQUEST, uploadProgress, uploadSuccess } from './actions';
import { END, eventChannel } from 'redux-saga';

export function* addFilesAndSubjectsWatcher() {
  yield takeEvery(UPLOAD_REQUEST, action => uploadFiles(action));
}

function* uploadFiles(action) {
  const { files, username, subjectName, fileType } = action;
  let payload = { username, subjectName, fileType };

  for (let index = 0; index < files.length; index++) {
    payload['file'] = files[index];
    try {
      const [uploadPromise, chan] = createUploader(payload);
      yield fork(watchOnProgress, { fileName: payload.file.name, chan: chan });

      const response = yield call(() => uploadPromise);

      if (response) {
        yield put(uploadSuccess(response.data));
        yield put(renderFiles(response));
      }
    } catch (err) {
      put({ type: 'ERROR', payload: err });
    }
  }
}

function upload(action, onUploadProgress) {
  const { file, subjectName, fileType } = action;

  let formData = new FormData();
  formData.append('files', file);

  return http({
    url: FILES + subjectName + '/' + fileType,
    method: 'post',
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
