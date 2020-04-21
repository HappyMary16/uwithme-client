import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas';
import { fileOperationWatcher } from '../pages/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/files/add/sagas';
import { addAccessToFilesWatcher } from '../pages/files/share/sagas';
import { commonDataWatcher } from '../common/sagas';
import { scheduleOperationWatcher } from '../pages/schedule/sagas';
import { teachersWatcher } from '../pages/users/sagas';
import { lectureHallWatcher } from '../pages/administration/lectureHalls/sagas';
import { groupWatcher } from '../pages/administration/structure/sagas/groups';
import { departmentWatcher } from '../pages/administration/structure/sagas/departments';
import { instituteWatcher } from '../pages/administration/structure/sagas/institutes';
import { universityWatcher } from '../pages/administration/structure/sagas/university';

export default function* rootSaga() {
  yield all([
    commonDataWatcher(),
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher(),
    scheduleOperationWatcher(),
    teachersWatcher(),
    lectureHallWatcher(),
    groupWatcher(),
    departmentWatcher(),
    instituteWatcher(),
    universityWatcher()
  ]);
}
