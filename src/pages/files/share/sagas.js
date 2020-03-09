import { call, takeEvery } from 'redux-saga/effects';
import http from '../../../services/http';
import { ADD_ACCESS } from '../../../constants/serverApi';
import { ADD_ACCESS_TO_FILES } from './actions';
import { FILES } from '../../../constants/links';
import { history } from '../../../store/Store';

export function* addAccessToFilesWatcher() {
  yield takeEvery(ADD_ACCESS_TO_FILES, action => addAccessToFiles(action));
}

function* addAccessToFiles(action) {
  try {
    const { fileIds, groupIds } = action;

    const response = yield call(http, {
      url: ADD_ACCESS,
      method: 'post',
      data: {
        fileIds: fileIds,
        groupIds: groupIds
      }
    });

    alert('Доступ надано');
    history.push(FILES);
  } catch (e) {
    //TODO add error
  }
}
