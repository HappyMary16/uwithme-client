import { call, put, takeEvery } from 'redux-saga/effects';
import { SIGN_UP_REQUEST } from './actions';
import { endFetching, startFetching } from '../../navigation/actions';
import http from '../../../services/http';
import {
  INFO_DEPARTMENTS,
  INFO_GROUPS,
  INFO_INSTITUTES,
  INFO_UNIVERSITIES,
  SIGN_UP
} from '../../../constants/serverApi';
import { signInError, signInSuccess } from '../signIn/actions';
import {
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  LOAD_UNIVERSITIES,
  RENDER_DEPARTMENTS,
  RENDER_INSTITUTES,
  renderUniversities
} from '../../admin/structure/actions';
import { renderGroups } from '../../admin/groupPage/actions';

export function* signUpWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, action => signUp(action));
  yield takeEvery(LOAD_UNIVERSITIES, loadUniversities);
  yield takeEvery(LOAD_INSTITUTES, loadInstitutes);
  yield takeEvery(LOAD_DEPARTMENTS, loadDepartments);
  yield takeEvery(LOAD_GROUPS, loadGroups);
}

function* signUp(action) {
  try {
    yield put(startFetching());

    let data = JSON.stringify({
      firstName: action.firstName,
      lastName: action.lastName,
      surname: action.surname,
      username: action.username,
      password: action.password,
      confirmPassword: action.confirmPassword,
      phone: action.phone,
      email: action.email,
      role: action.userRole,
      studentId: action.studentId,
      scienceDegreeId: action.scienceDegree,
      instituteId: action.institute,
      departmentId: action.department,
      studyGroupId: action.group,
      universityId: action.universityId
    });

    const response = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
    } else {
      alert(response);
      yield put(signInError(response));
    }
    //TODO reaction on non-success result
  } catch (e) {
    alert(e);
    yield put(signInError(e));
    //TODO message about error
  } finally {
    yield put(endFetching());
  }
}

function* loadUniversities() {
  try {
    yield put(startFetching());

    const universities = yield call(http, {
      url: INFO_UNIVERSITIES,
      method: 'get'
    });

    if (universities) {
      yield put(renderUniversities(universities.data));
    }
  } catch (e) {
    alert(e + ' loadUniversities');
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutes() {
  try {
    yield put(startFetching());

    const institutes = yield call(http, {
      url: INFO_INSTITUTES,
      method: 'get'
    });

    if (institutes) {
      yield put({ type: RENDER_INSTITUTES, institutes });
    }
  } catch (e) {
    alert(e + ' loadInstitutes()');
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartments() {
  try {
    yield put(startFetching());

    const departments = yield call(http, {
      url: INFO_DEPARTMENTS,
      method: 'get'
    });

    if (departments) {
      yield put({ type: RENDER_DEPARTMENTS, departments });
    }
  } catch (e) {
    alert(e + ' loadDepartments()');
  } finally {
    yield put(endFetching());
  }
}

function* loadGroups() {
  try {
    yield put(startFetching());

    const groups = yield call(http, {
      url: INFO_GROUPS,
      method: 'get'
    });

    if (groups) {
      yield put(renderGroups(groups.data));
    }
  } catch (e) {
    alert(e + ' loadGroups()');
  } finally {
    yield put(endFetching());
  }
}
