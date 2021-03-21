import { call, put, takeEvery } from 'redux-saga/effects';
import { ADD_LESSON_TO_SCHEDULE } from './actions';
import http from '../../../services/http';
import { LESSONS } from '../../../constants/serverApi';
import { endFetching, startFetching } from '../../navigation/actions';
import { addError } from '../../../actions/messageAction';

export function* addLessonWatcher() {
  yield takeEvery(ADD_LESSON_TO_SCHEDULE, action =>
    addLessonToSchedule(action)
  );
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
      url: LESSONS,
      method: 'post',
      data
    });

    if (response && response.status === 201) {
      alert('Пари додані в розклад');
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
