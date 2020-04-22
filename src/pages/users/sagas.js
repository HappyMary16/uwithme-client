import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import {
  findStudentsByTeacherId,
  findTeachersByGroupId,
  GET_LESSONS_BY_USER_ID,
  GET_TEACHERS_BY_UNIVERSITY_ID
} from '../../constants/serverApi';
import {
  FIND_LESSONS_FOR_USER,
  LOAD_STUDENTS_BY_TEACHER_ID,
  LOAD_TEACHERS_BY_GROUP_ID,
  LOAD_TEACHERS_BY_UNIVERSITY_ID,
  renderLessonsForUser,
  renderUsers
} from './actions';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, action => getTeachersByUniversityId(action));
  yield takeEvery(LOAD_TEACHERS_BY_GROUP_ID, action => getTeachersByGroupId(action));
  yield takeEvery(FIND_LESSONS_FOR_USER, action => findLessonsByUsername(action));
  yield takeEvery(LOAD_STUDENTS_BY_TEACHER_ID, action => getStudentsByTeacherId(action));
}

function* getTeachersByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const teachers = yield call(http, {
      url: GET_TEACHERS_BY_UNIVERSITY_ID + universityId,
      method: 'get'
    });

    yield put(renderUsers(teachers.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getTeachersByGroupId(action) {
  try {
    yield put(startFetching());
    const { groupId } = action.payload;

    const teachers = yield call(http, {
      url: findTeachersByGroupId(groupId),
      method: 'get'
    });

    yield put(renderUsers(teachers.data));
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

    yield put(renderLessonsForUser(data));

  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* getStudentsByTeacherId(action) {
  try {
    yield put(startFetching());
    const { teacherId } = action.payload;

    console.log(findStudentsByTeacherId(teacherId));
    const students = yield call(http, {
      url: findStudentsByTeacherId(teacherId),
      method: 'get'
    });

    yield put(renderUsers(students.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}