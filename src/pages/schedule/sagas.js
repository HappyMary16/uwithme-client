import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_LESSON_TO_SCHEDULE } from './actions';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { ADD_LESSON } from '../../constants/serverApi';

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
      lessonTime,
      weekNumber
    } = action.payload;

    console.log(action.payload);

    let data = {
      subjectId: subjectId === subjectName ? undefined : subjectId,
      subjectName: subjectId === subjectName ? subjectName : undefined,
      teacherId: teacherId === teacherName ? undefined : teacherId,
      teacherName: teacherId === teacherName ? teacherName : undefined,
      lectureHall,
      groups: groups.map(group => group.value),
      weekDay,
      lessonTime,
      weekNumber
    };

    console.log(data);

    const response = yield call(http, {
      url: ADD_LESSON,
      method: 'post',
      data
    });

    alert(response);
    console.log(response);
    //TODO continue...

  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}