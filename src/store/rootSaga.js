import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas';
import { fileOperationWatcher } from '../pages/user/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/user/addFiles/sagas';
import { addAccessToFilesWatcher } from '../pages/user/shareFiles/sagas';
import { scheduleOperationWatcher } from '../pages/user/schedule/sagas';
import { teachersWatcher } from '../pages/user/sagas';
import { lectureHallWatcher } from '../pages/admin/lectureHalls/sagas';
import { groupWatcher } from '../pages/admin/structure/sagas/groups';
import { departmentWatcher } from '../pages/admin/structure/sagas/departments';
import { instituteWatcher } from '../pages/admin/structure/sagas/institutes';
import { addLessonWatcher } from '../pages/admin/addLesson/sagas';
import { deleteLessonWatcher } from '../pages/admin/deleteLesson/sagas';
import { groupsWatcher } from '../pages/admin/groupPage/sagas';

export default function* rootSaga() {
  yield all([
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher(),
    scheduleOperationWatcher(),
    addLessonWatcher(),
    deleteLessonWatcher(),
    teachersWatcher(),
    groupsWatcher(),
    lectureHallWatcher(),
    groupWatcher(),
    departmentWatcher(),
    instituteWatcher()
  ]);
}
