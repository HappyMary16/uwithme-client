import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE_LESSON } from './actions';
import { endFetching, startFetching } from '../../navigation/actions';
import http from '../../../services/http';
import { LESSONS } from '../../../constants/serverApi';
import { renderLesson } from '../../user/schedule/actions';
import { addError } from '../../common/action';

export function* deleteLessonWatcher() {
  yield takeEvery(DELETE_LESSON, action => deleteLesson(action));
}

function* deleteLesson(action) {
  try {
    yield put(startFetching());
    const { lesson, groups } = action.payload;
    let data = {
      lessonId: lesson.id
    };

    if (groups.length === 0) {
      return;
    }
    if (groups.length !== lesson.groups.length) {
      data.groups = groups;
    }

    const response = yield call(http, {
      url: LESSONS,
      method: 'delete',
      data
    });

    if (response) {
      yield put(renderLesson(lesson.id, response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
