import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_GROUP, groupCreated, LOAD_GROUPS_BY_UNIVERSITY_ID, RENDER_GROUPS } from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import { ADD_GROUP_API, getGroupByTeacherId, getGroupByUniversityId } from '../../../../constants/serverApi';
import { FIND_GROUPS_FOR_TEACHER, renderGroupsForTeacher } from '../../../users/actions';

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, action => createGroup(action));
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, action => loadGroupsByUniversityId(action));
  yield takeEvery(FIND_GROUPS_FOR_TEACHER, action => loadGroupsByTeacherId(action));
}

function* createGroup(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName, course, groupName } = action.payload;

    const response = yield call(http, {
      url: ADD_GROUP_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName,
        departmentName: departmentName,
        groupName: groupName,
        course: course
      }
    });

    if (response && response.status === 200) {
      yield put(groupCreated(response.data));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupsByUniversityId(action) {
  try {
    yield put(startFetching());
    const { payload } = action;

    const groups = yield call(http, {
      url: getGroupByUniversityId(payload),
      method: 'get'
    });

    yield put({ type: RENDER_GROUPS, groups });
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupsByTeacherId(action) {
  try {
    yield put(startFetching());
    const { teacherId } = action.payload;

    const groups = yield call(http, {
      url: getGroupByTeacherId(teacherId),
      method: 'get'
    });

    yield put(renderGroupsForTeacher(groups.data));
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}
