import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { GET_TEACHERS_BY_GROUP_ID, GET_TEACHERS_BY_UNIVERSITY_ID } from '../../constants/serverApi';
import { LOAD_TEACHERS_BY_GROUP_ID, LOAD_TEACHERS_BY_UNIVERSITY_ID, renderTeachers } from './actions';

export function* teachersWatcher() {
  yield takeEvery(LOAD_TEACHERS_BY_UNIVERSITY_ID, action =>
    getTeachersByUniversityId(action)
  );
  yield takeEvery(LOAD_TEACHERS_BY_GROUP_ID, action =>
    getTeachersByGroupId(action)
  );
}

function* getTeachersByUniversityId(action) {
  try {
    yield put(startFetching());
    const { universityId } = action.payload;

    const teachers = yield call(http, {
      url: GET_TEACHERS_BY_UNIVERSITY_ID + universityId,
      method: 'get'
    });

    yield put(renderTeachers(teachers.data));
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
      url: GET_TEACHERS_BY_GROUP_ID(groupId),
      method: 'get'
    });

    yield put(renderTeachers(teachers.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}