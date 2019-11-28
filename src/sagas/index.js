import { all } from 'redux-saga/effects';

import { loginFlow } from '../pages/authorization/sagas/authSagas';

export default function* rootSaga() {
  yield all([loginFlow()]);
}
