import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { ADD_DEPARTMENT_API, ADD_INSTITUTE_API, ADD_UNIVERSITY_API } from '../../constants/serverApi';
import { ADD_UNIVERSITY, CREATE_DEPARTMENT, CREATE_INSTITUTE, departmentCreated, instituteCreated } from './actions';
import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from '../authorization/actions';
import { history } from '../../store/Store';
import { USER_HOME } from '../../constants/links';

export function* administrationWatcher() {
  yield takeEvery(ADD_UNIVERSITY, action => addUniversity(action));
  yield takeEvery(CREATE_INSTITUTE, action => createInstitute(action));
  yield takeEvery(CREATE_DEPARTMENT, action => createDepartment(action));
}

function* addUniversity(action) {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: ADD_UNIVERSITY_API,
      method: 'post',
      data: {
        universityName: action.payload.universityName,
        username: action.payload.username,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword
      }
    });

    if (response && response.status === 200) {
      yield call(signInSuccess, response);
    } else {
      yield call(signInError, response);
    }
  } catch (error) {
    alert(error);
    yield call(signInError, error);
  } finally {
    yield put(endFetching());
  }
}

function* createInstitute(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName } = action.payload;

    const response = yield call(http, {
      url: ADD_INSTITUTE_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName
      }
    });

    if (response && response.status === 200) {
      yield put(instituteCreated(response.data));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
  } finally {
    yield put(endFetching());
  }
}

function* createDepartment(action) {
  try {
    yield put(startFetching());

    const { universityId, instituteName, departmentName } = action.payload;

    const response = yield call(http, {
      url: ADD_DEPARTMENT_API,
      method: 'post',
      data: {
        universityId: universityId,
        instituteName: instituteName,
        departmentName: departmentName
      }
    });

    if (response && response.status === 200) {
      yield put(departmentCreated(response.data));
    } else {
      alert(response);
    }
  } catch (error) {
    alert(error);
  } finally {
    yield put(endFetching());
  }
}

function* signInSuccess(response) {
  yield put({ type: SIGN_IN_SUCCESS, response });
  localStorage.setItem('AuthToken', response.data.token);

  //TODO go to right page
  history.push(USER_HOME);
}

function* signInError(message) {
  localStorage.setItem('AuthToken', null);
  yield put({ type: SIGN_IN_ERROR, message });
}
