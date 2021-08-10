import { call, put, takeEvery } from "redux-saga/effects";
import {
  GROUPS,
  GROUPS_BY_UNIVERSITY_ID,
  INFO_GROUPS,
  USER_GROUP
} from "../constants/serverApi";
import { loadInstitutesByUniversityId } from "../actions/instituteActions";
import { loadDepartmentsByUniversityId } from "../actions/departmentActions";
import {
  CREATE_GROUP,
  LOAD_GROUP,
  LOAD_GROUP_BY_ID,
  LOAD_GROUPS,
  LOAD_GROUPS_BY_TEACHER,
  LOAD_GROUPS_BY_UNIVERSITY_ID,
  renderGroup,
  renderGroups,
  renderGroupsForRegistration,
  renderUserGroup
} from "../actions/groupActions";
import { processHttpCall } from "./rootSaga";

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, createGroup);
  yield takeEvery(LOAD_GROUPS, loadGroups);
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, loadGroupsByUniversityId);
  yield takeEvery(LOAD_GROUP_BY_ID, loadGroupById);
  yield takeEvery(LOAD_GROUP, loadGroup);
  yield takeEvery(LOAD_GROUPS_BY_TEACHER, loadGroupByTeacher);
}

function* createGroup(action) {
  const response = yield call(processHttpCall, {
    url: GROUPS,
    method: "post",
    data: action.payload
  });

  if (response) {
    yield put(loadInstitutesByUniversityId());
    yield put(loadDepartmentsByUniversityId());
    yield put(renderGroup(response));
  }
}

function* loadGroups(action) {
  let { departmentId } = action.payload;

  const response = yield call(processHttpCall, {
    url: INFO_GROUPS + departmentId,
    method: "get"
  });

  if (response) {
    yield put(renderGroupsForRegistration(response));
  }
}

function* loadGroupsByUniversityId(action) {
  const { universityId } = action.payload;

  const response = yield call(processHttpCall, {
    url: GROUPS_BY_UNIVERSITY_ID + universityId,
    method: "get"
  });

  if (response) {
    yield put(renderGroups(response));
  }
}

function* loadGroupById(action) {
  const { id } = action.payload;

  const response = yield call(processHttpCall, {
    url: GROUPS + id,
    method: "get"
  });

  if (response) {
    yield put(renderGroup(response));
  }
}

function* loadGroup() {
  const response = yield call(processHttpCall, {
    url: USER_GROUP,
    method: "get"
  });

  if (response) {
    yield put(renderUserGroup(response));
  }
}

function* loadGroupByTeacher() {
  const response = yield call(processHttpCall, {
    url: GROUPS,
    method: "get"
  });

  if (response) {
    yield put(renderGroups(response));
  }
}
