import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_LESSON_TO_SCHEDULE, FIND_LESSONS_BY_GROUP_ID, FIND_LESSONS_BY_USER_NAME, renderLessons } from './actions';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { ADD_LESSON, GET_LESSONS_BY_GROUP_ID, GET_LESSONS_BY_USER_ID } from '../../constants/serverApi';

export function* scheduleOperationWatcher() {
  yield takeEvery(ADD_LESSON_TO_SCHEDULE, action => addLessonToSchedule(action));
  yield takeEvery(FIND_LESSONS_BY_GROUP_ID, action => findLessonsByGroupId(action));
  yield takeEvery(FIND_LESSONS_BY_USER_NAME, action => findLessonsByUsername(action));
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
      weekDays,
      lessonTimes,
      weekNumbers
    } = action.payload;

    let data = {
      subjectId: subjectId === subjectName ? undefined : subjectId,
      subjectName: subjectName,
      teacherId: teacherId === teacherName ? undefined : teacherId,
      teacherName: teacherName,
      lectureHall,
      groups: groups.map(group => group.value),
      weekDays: weekDays.map(weekDay => weekDay.value),
      lessonTimes: lessonTimes.map(lessonTime => lessonTime.value),
      weekNumbers: weekNumbers.map(weekNumber => weekNumber.value)
    };

    const response = yield call(http, {
      url: ADD_LESSON,
      method: 'post',
      data
    });

    if (response.status === 200) {
      alert('Пари додані в розклад');
    }

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* findLessonsByGroupId(action) {
  try {
    yield put(startFetching());

    const {
      groupId
    } = action.payload;

    const { data } = yield call(http, {
      url: GET_LESSONS_BY_GROUP_ID + groupId,
      method: 'get'
    });
    yield put(renderLessons(data));

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* findLessonsByUsername(action) {
  try {
    yield put(startFetching());

    const {
      username
    } = action.payload;

    const { data } = yield call(http, {
      url: GET_LESSONS_BY_USER_ID + username,
      method: 'get'
    });

    yield put(renderLessons(data));

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}