import { call, put, takeEvery } from 'redux-saga/effects';
import { endFetching, startFetching } from '../../common/actions';
import http from '../../services/http';
import { ADD_UNIVERSITY_API } from '../../common/constants/serverApi';
import { ADD_UNIVERSITY } from './actions';

export function* administrationWatcher() {
  yield takeEvery(ADD_UNIVERSITY, action => addUniversity(action));
}

function* addUniversity(action) {
  try {
    yield put(startFetching());

    const response = yield call(http, {
      url: ADD_UNIVERSITY_API,
      method: 'post',
      data: {
        university: action.university,
        username: action.username,
        password: action.password
      }
    });

    //TODO render result
    // as this
    // yield put(renderFiles(response));
  } catch (e) {
    //TODO process errors
  } finally {
    yield put(endFetching());
  }
}
