import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import infoReducers from '../common/reducers';
import rootSaga from '../common/sagas';
import authReducers from '../pages/authorization/reducers';
import filesReducers from '../pages/files/reducers';

import { connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';
import loadingProcess from '../common/reducers/loadingReducer';

export const history = createBrowserHistory();

export default function createAppStore() {
  const stateLoader = new StateLoader();
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    router: connectRouter(history),
    infoReducers,
    authReducers,
    filesReducers: filesReducers,
    loadingProcess
  });

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  store.subscribe(() => {
    stateLoader.saveState(store.getState());
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
