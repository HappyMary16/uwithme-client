import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas';
import { fileOperationWatcher } from '../pages/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/files/add/sagas';
import { addAccessToFilesWatcher } from '../pages/files/share/sagas';
import { commonDataWatcher } from '../common/sagas';
import { scheduleOperationWatcher } from '../pages/schedule/sagas';
import { teachersWatcher } from '../pages/users/sagas';
import { lectureHallWatcher } from '../pages/admin/lectureHalls/sagas';
import { groupWatcher } from '../pages/admin/structure/sagas/groups';
import { departmentWatcher } from '../pages/admin/structure/sagas/departments';
import { instituteWatcher } from '../pages/admin/structure/sagas/institutes';
import { universityWatcher } from '../pages/admin/structure/sagas/university';

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
