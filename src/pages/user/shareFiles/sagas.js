import { call, put, takeEvery } from 'redux-saga/effects';
import http from '../../../services/http';
import { FILES_ACCESS, GROUPS } from '../../../constants/serverApi';
import { ADD_ACCESS_TO_FILES, LOAD_GROUPS_BY_TEACHER } from './actions';
import { FILES } from '../../../constants/links';
import { history } from '../../../store/Store';
import { endFetching, startFetching } from '../../navigation/actions';
import { addError } from '../../common/action';
import { renderGroups } from '../../../actions/groupActions';

export function* addAccessToFilesWatcher() {
  yield takeEvery(ADD_ACCESS_TO_FILES, action => addAccessToFiles(action));
  yield takeEvery(LOAD_GROUPS_BY_TEACHER, () => loadGroupByTeacher());
}

function* addAccessToFiles(action) {
  try {
    const { fileIds, groupIds } = action;

    const response = yield call(http, {
      url: FILES_ACCESS,
      method: 'post',
      data: {
        fileIds: fileIds,
        groupIds: groupIds
      }
    });

    if (response.status === 200) {
      alert('Доступ надано');
    } else {
      alert('Something went wrong, status: ' + response.status);
    }
    history.push(FILES);
  } catch (e) {
    yield put(addError(e));
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
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
