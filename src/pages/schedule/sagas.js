import { put, takeEvery } from 'redux-saga/effects';
import { ADD_LESSON_TO_SCHEDULE } from './actions';
import { endFetching, startFetching } from '../../common/actions';

export function* scheduleOperationWatcher() {
  yield takeEvery(ADD_LESSON_TO_SCHEDULE, action => addLessonToSchedule(action));
}

function* addLessonToSchedule(action) {
  try {
    yield put(startFetching());

    const {
      subjectId,
      subjectName,
      teacherId,
      teacherName,
      lectureHall,
      groups,
      weekDay,
      time,
      weekNumber
    } = action.payload;

    //TODO continue...

  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}