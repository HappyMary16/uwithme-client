import { all, call, put, takeEvery, take } from 'redux-saga/effects';
import {
  LOAD_TODO_LIST,
  RENDER_TODO_LIST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_ERROR
} from '../actions';
import { takeLatest } from 'redux-saga/effects';
import {
  HANDLE_AUTHENTICATION_CALLBACK,
  USER_PROFILE_LOADED
} from '../actions';
import { handleAuthentication } from '../Auth';

export function* authorize(username, password) {
  try {
    const endpoint = 'http://localhost:8080/login';
    let bodydata = JSON.stringify({
      username: username,
      password: password
    });
    const response = yield call(fetch, endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodydata
    });

    if (response.statusCode === 200) {
      return response;
      //return response.token;
    } else {
      throw new Error('Required');
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  }
}

export function* loginFlow() {
  while (true) {
    const { username, password } = yield take(LOGIN_REQUEST);
    const token = yield call(authorize, username, password);
    if (token) {
      yield put({ type: LOGIN_SUCCESS, token });
      yield take(LOGOUT);
      // some actions after logout
      // yield put({ type: 'SAVE_TOKEN' });
    }
  }
}

export function* fetchToDoList() {
  const endpoint =
    'https://gist.githubusercontent.com/brunokrebs/f1cacbacd53be83940e1e85860b6c65b/raw/to-do-items.json';
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: RENDER_TODO_LIST, toDoList: data });
}

export function* loadToDoList() {
  yield takeEvery(LOAD_TODO_LIST, fetchToDoList);
}

export function* parseHash() {
  const user = yield call(handleAuthentication);
  yield put({ type: USER_PROFILE_LOADED, user });
}

export function* handleAuthenticationCallback() {
  yield takeLatest(HANDLE_AUTHENTICATION_CALLBACK, parseHash);
}

export default function* rootSaga() {
  yield all([loadToDoList(), handleAuthenticationCallback(), loginFlow()]);
}
