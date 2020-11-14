import { call, put, takeEvery } from 'redux-saga/effects';

import http from '../../services/http';
import {
  AVATAR,
  INFO_DEPARTMENTS,
  INFO_GROUPS,
  INFO_INSTITUTES,
  INFO_UNIVERSITIES,
  SIGN_IN,
  SIGN_UP
} from '../../constants/serverApi';
import { endFetching, startFetching } from '../navigation/actions';
import { UPLOAD_AVATAR } from '../user/actions';
import {
  DOWNLOAD_MY_AVATAR,
  downloadMyAvatar,
  LOAD_DEPARTMENTS,
  LOAD_GROUPS,
  LOAD_INSTITUTES,
  LOAD_UNIVERSITIES,
  renderDepartmentForRegistration,
  renderGroupsForRegistration,
  renderInstitutesForRegistration,
  renderMyAvatar,
  renderUniversitiesForRegistration,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST,
  signInSuccess
} from './actions';
import { USER_DOES_NOT_HAVE_ACCOUNT } from '../../constants/errors';
import { history } from '../../store/Store';
import { USER_HOME } from '../../constants/links';
import { arrayBufferToDataUrl } from '../../utils/FileUtil';
import { addError, removeError } from '../common/action';

export function* authorizationWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, action => signUp(action));
  yield takeEvery(LOAD_UNIVERSITIES, loadUniversities);
  yield takeEvery(LOAD_INSTITUTES, action => loadInstitutes(action));
  yield takeEvery(LOAD_DEPARTMENTS, action => loadDepartments(action));
  yield takeEvery(LOAD_GROUPS, action => loadGroups(action));

  yield takeEvery(SIGN_IN_REQUEST, processSignIn);
  yield takeEvery(SIGN_IN_SUCCESS, processSignInSuccess);
  yield takeEvery(DOWNLOAD_MY_AVATAR, processDownloadMyAvatar);

  yield takeEvery(UPLOAD_AVATAR, action => uploadAvatar(action));
}

function* signUp(action) {
  try {
    yield put(startFetching());

    let data = JSON.stringify(action.payload);

    const response = yield call(http, {
      url: SIGN_UP,
      method: 'post',
      data: data
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
      yield put(removeError(USER_DOES_NOT_HAVE_ACCOUNT.code));
    } else {
      yield put(addError(response));
    }
  } catch (e) {
    yield put(addError(e));
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
      yield put(renderUniversitiesForRegistration(universities.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadInstitutes(action) {
  try {
    yield put(startFetching());
    let { universityId } = action.payload;

    const institutes = yield call(http, {
      url: INFO_INSTITUTES + universityId,
      method: 'get'
    });

    if (institutes) {
      yield put(renderInstitutesForRegistration(institutes.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadDepartments(action) {
  try {
    yield put(startFetching());
    let { instituteId } = action.payload;

    const departments = yield call(http, {
      url: INFO_DEPARTMENTS + instituteId,
      method: 'get'
    });

    if (departments) {
      yield put(renderDepartmentForRegistration(departments.data));
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

    const groups = yield call(http, {
      url: INFO_GROUPS + departmentId,
      method: 'get'
    });

    if (groups) {
      yield put(renderGroupsForRegistration(groups.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* processSignIn() {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: SIGN_IN,
      method: 'get'
    });

    if (response && response.status === 200) {
      yield put(signInSuccess(response.data));
    } else if (response && response.status === 404) {
      yield put(addError(USER_DOES_NOT_HAVE_ACCOUNT));
    } else {
      yield put(addError(response));
    }
  } catch (error) {
    yield put(addError(error));
  } finally {
    yield put(endFetching());
  }
}

function* processSignInSuccess() {
  history.push(USER_HOME);
  yield put(downloadMyAvatar());
}

function* processDownloadMyAvatar() {
  const response = yield call(http, {
    url: AVATAR,
    method: 'get',
    loadFile: true
  });

  if (response && response.status !== 204) {
    yield put(renderMyAvatar(arrayBufferToDataUrl(response.data)));
  } else {
    return {};
  }
}

function* uploadAvatar(action) {
  try {
    yield put(startFetching());

    const { avatar } = action.payload;
    const formData = new FormData();

    formData.append('file', avatar, 'avatar.png');

    let response = yield call(http, {
      url: AVATAR,
      method: 'post',
      data: formData,
      isFile: true
    });

    if (response && response.status === 200) {
      yield put(downloadMyAvatar());
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
