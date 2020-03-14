import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas';
import { fileOperationWatcher } from '../pages/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/files/add/sagas';
import { addAccessToFilesWatcher } from '../pages/files/share/sagas';
import { commonDataWatcher } from '../common/sagas';
import { administrationWatcher } from '../pages/administration/sagas';
import { scheduleOperationWatcher } from '../pages/schedule/sagas';
import { teachersWatcher } from '../pages/teachers/sagas';

export default function* rootSaga() {
  yield all([
    commonDataWatcher(),
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher(),
    administrationWatcher(),
    scheduleOperationWatcher(),
    teachersWatcher()
  ]);
}
