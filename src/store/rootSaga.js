import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas/authSagas';
import { fileOperationWatcher } from '../pages/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/files/add/sagas';
import { addAccessToFilesWatcher } from '../pages/files/share/sagas';
import { commonDataWatcher } from '../common/sagas';

export default function* rootSaga() {
  yield all([
    commonDataWatcher(),
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher()
  ]);
}
