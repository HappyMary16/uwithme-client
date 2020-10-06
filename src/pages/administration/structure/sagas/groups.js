import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_GROUP,
  LOAD_GROUP_BY_ID,
  LOAD_GROUPS_BY_UNIVERSITY_ID,
  loadDepartmentsByUniversityId,
  loadInstitutesByUniversityId,
  renderGroup
} from '../actions';
import { endFetching, startFetching } from '../../../../common/actions';
import http from '../../../../services/http';
import { GROUPS, GROUPS_BY_UNIVERSITY_ID } from '../../../../constants/serverApi';
import { LOAD_GROUPS_BY_TEACHER, renderGroups } from '../../../groups/actions';

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, action => createGroup(action));
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, action => loadGroupsByUniversityId(action));
  yield takeEvery(LOAD_GROUP_BY_ID, action => loadGroupById(action));
  yield takeEvery(LOAD_GROUPS_BY_TEACHER, () => loadGroupByTeacher());
}

function* createGroup(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName, course, groupName, isShowingInRegistration } = action.payload;

    const response = yield call(http, {
      url: GROUPS,
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
      yield put(loadInstitutesByUniversityId());
      yield put(loadDepartmentsByUniversityId());
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
      url: GROUPS_BY_UNIVERSITY_ID + payload,
      method: 'get'
    });

    if (groups) {
      yield put(renderGroups(groups.data));
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
      url: GROUPS + id,
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

function* loadGroupByTeacher() {
  try {
    yield put(startFetching());

    const group = yield call(http, {
      url: GROUPS,
      method: 'get'
    });

    if (group) {
      yield put(renderGroups(group.data));
    }
  } catch (e) {
    alert(e);
  } finally {
    yield put(endFetching());
  }
}