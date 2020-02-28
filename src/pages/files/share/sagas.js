import { call, takeEvery } from 'redux-saga/effects';
import http from '../../../services/http';
import { ADD_ACCESS } from '../../../common/constants/serverApi';
import { ADD_ACCESS_TO_FILES } from './actions';

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
  } catch (e) {
    //TODO add error
  }
}
