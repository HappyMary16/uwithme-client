import { call, takeEvery } from 'redux-saga/effects';
import http from '../../../services/http';
import { FILES_ACCESS } from '../../../constants/serverApi';
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
    //TODO add error
  }
}
