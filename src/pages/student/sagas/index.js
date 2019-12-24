import {
  LOAD_SUBJECTS,
  RENDER_SUBJECTS,
  SAVE_SUBJECTS
} from '../actions/userActions';
import { take, call, put } from 'redux-saga/effects';
import http from '../../../services/http';
import { GET_SUBJECTS, POST_SUBJECTS } from '../../../constants/serverApi';

export function* loadSubjects() {
  const { teacherUsername } = yield take(LOAD_SUBJECTS);
  const response = yield call(http, {
    url: GET_SUBJECTS + teacherUsername,
    method: 'get'
  });

  yield put({ type: RENDER_SUBJECTS, response });
}

export function* saveSubject() {
  const { teacherUsername, subjectName } = yield take(SAVE_SUBJECTS);
  const response = yield call(http, {
    url: POST_SUBJECTS + teacherUsername + '/' + subjectName,
    method: 'post'
  });

  yield put({ type: LOAD_SUBJECTS, teacherUsername: teacherUsername });
}
