import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../pages/navigation/actions';
import http from '../services/http';
import {
  GROUPS,
  GROUPS_BY_UNIVERSITY_ID,
  INFO_GROUPS,
  USER_GROUP
} from '../constants/serverApi';
import { addError } from '../actions/messageAction';
import { loadInstitutesByUniversityId } from '../actions/instituteActions';
import { loadDepartmentsByUniversityId } from '../actions/departmentActions';
import {
  CREATE_GROUP,
  LOAD_GROUP,
  LOAD_GROUP_BY_ID,
  LOAD_GROUPS,
  LOAD_GROUPS_BY_UNIVERSITY_ID,
  renderGroup,
  renderGroups,
  renderGroupsForRegistration,
  renderUserGroup
} from '../actions/groupActions';

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, action => createGroup(action));
  yield takeEvery(LOAD_GROUPS, action => loadGroups(action));
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, action =>
    loadGroupsByUniversityId(action)
  );
  yield takeEvery(LOAD_GROUP_BY_ID, action => loadGroupById(action));
  yield takeEvery(LOAD_GROUP, loadGroup);
}

function* createGroup(action) {
  try {
    yield put(startFetching());

    const {
      universityId,
      instituteName,
      departmentName,
      course,
      groupName,
      isShowingInRegistration
    } = action.payload;

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
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadGroups(action) {
  try {
    yield put(startFetching());
    let { departmentId } = action.payload;

    const response = yield call(http, {
      url: INFO_GROUPS + departmentId,
      method: 'get'
    });

    if (response) {
      yield put(renderGroupsForRegistration(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupsByUniversityId(action) {
  try {
    yield put(startFetching());
    const { payload } = action;

    const response = yield call(http, {
      url: GROUPS_BY_UNIVERSITY_ID + payload,
      method: 'get'
    });

    if (response) {
      yield put(renderGroups(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupById(action) {
  try {
    yield put(startFetching());
    const { id } = action.payload;

    const response = yield call(http, {
      url: GROUPS + id,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderGroup(response.data));
    } else {
      yield put(addError(response.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadGroup() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: USER_GROUP,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(renderUserGroup(response.data));
    } else if (response && response.status === 404) {
      yield put(renderUserGroup());
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
