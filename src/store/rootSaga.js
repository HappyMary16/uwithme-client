import { all } from 'redux-saga/effects';
import { authorizationWatcher } from '../pages/authorization/sagas';
import { fileOperationWatcher } from '../pages/user/files/sagas';
import { addFilesAndSubjectsWatcher } from '../pages/user/addFiles/sagas';
import { addAccessToFilesWatcher } from '../pages/user/shareFiles/sagas';
import { lectureHallWatcher } from '../pages/admin/lectureHalls/sagas';
import { groupWatcher } from '../sagas/groupSagas';
import { departmentWatcher } from '../sagas/departmentSagas';
import { instituteWatcher } from '../sagas/instituteSagas';
import { addLessonWatcher } from '../pages/admin/addLesson/sagas';
import { deleteLessonWatcher } from '../pages/admin/deleteLesson/sagas';
import { universityWatcher } from '../sagas/universitySagas';
import { scheduleWatcher } from '../sagas/scheduleSagas';
import { usersWatcher } from '../sagas/userSagas';
import { structureWatcher } from '../sagas/structureSagas';
import { studCabinetWatcher } from '../sagas/studCabinetSagas';

export default function* rootSaga() {
  yield all([
    authorizationWatcher(),
    fileOperationWatcher(),
    addFilesAndSubjectsWatcher(),
    addAccessToFilesWatcher(),
    scheduleWatcher(),
    addLessonWatcher(),
    deleteLessonWatcher(),
    usersWatcher(),
    lectureHallWatcher(),
    groupWatcher(),
    departmentWatcher(),
    instituteWatcher(),
    universityWatcher(),
    structureWatcher(),
    studCabinetWatcher()
  ]);
}
