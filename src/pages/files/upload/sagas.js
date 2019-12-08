import { call, put, take } from 'redux-saga/effects';
import {
  uploadProgress,
  uploadSuccess,
  uploadFailure,
  UPLOAD_REQUEST
} from './actions';
import { createUploadFileChannel } from './createFileUploadChannel';
// Watch for an upload request and then
// defer to another saga to perform the actual upload
export function* uploadRequestWatcherSaga() {
  const { file } = yield take(UPLOAD_REQUEST);
  console.log('file');
  yield call(uploadFileSaga, file);
}
// Upload the specified file
export function* uploadFileSaga(file) {
  const channel = yield call(createUploadFileChannel, '/some/path', file);
  while (true) {
    const { progress = 0, err, success } = yield take(channel);
    if (err) {
      yield put(uploadFailure(file, err));
      return;
    }
    if (success) {
      yield put(uploadSuccess(file));
      return;
    }
    yield put(uploadProgress(file, progress));
  }
}
