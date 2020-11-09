import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_GROUP,
  LOAD_GROUPS_BY_UNIVERSITY_ID,
  loadDepartmentsByUniversityId,
  loadInstitutesByUniversityId,
  renderGroup
} from '../actions';
import {
  addError,
  endFetching,
  startFetching
} from '../../../navigation/actions';
import http from '../../../../services/http';
import {
  GROUPS,
  GROUPS_BY_UNIVERSITY_ID
} from '../../../../constants/serverApi';
import { renderGroups } from '../../groupPage/actions';

export function* groupWatcher() {
  yield takeEvery(CREATE_GROUP, action => createGroup(action));
  yield takeEvery(LOAD_GROUPS_BY_UNIVERSITY_ID, action =>
    loadGroupsByUniversityId(action)
  );
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
      alert(response);
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

    const groups = yield call(http, {
      url: GROUPS_BY_UNIVERSITY_ID + payload,
      method: 'get'
    });

    if (groups) {
      yield put(renderGroups(groups.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
