import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_GROUP,
  LOAD_GROUP_BY_ID,
  LOAD_GROUPS_BY_UNIVERSITY_ID,
  loadDepartmentsByUniversityId,
  loadInstitutesByUniversityId,
  RENDER_GROUPS,
  renderGroup
} from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import {
  ADD_GROUP_API,
  getGroupById,
  getGroupByTeacherId,
  getGroupByUniversityId
} from '../../../../constants/serverApi';
import { FIND_GROUPS_FOR_TEACHER, renderGroupsForTeacher } from '../../../users/actions';

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, action => createGroup(action));
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, action => loadGroupsByUniversityId(action));
  yield takeEvery(FIND_GROUPS_FOR_TEACHER, action => loadGroupsByTeacherId(action));
  yield takeEvery(LOAD_GROUP_BY_ID, action => loadGroupById(action));
}

function* createGroup(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName, course, groupName, isShowingInRegistration } = action.payload;

    const response = yield call(http, {
      url: ADD_GROUP_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName,
        departmentName: departmentName,
        groupName: groupName,
        course: course,
        isShowingInRegistration: isShowingInRegistration
      }
    });

    if (response && response.status === 200) {
      yield put(loadInstitutesByUniversityId(universityId));
      yield put(loadDepartmentsByUniversityId(universityId));
      yield put(renderGroup(response.data));
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

    if (groups) {
      yield put({ type: RENDER_GROUPS, groups });
    }
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

    if (groups) {
      yield put(renderGroupsForTeacher(groups.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupById(action) {
  try {
    yield put(startFetching());
    const { id } = action.payload;

    const group = yield call(http, {
      url: getGroupById(id),
      method: 'get'
    });

    if (group) {
      yield put(renderGroup(group.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}