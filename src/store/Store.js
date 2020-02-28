import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import infoReducers from '../common/reducers';
import authReducers from '../pages/authorization/reducers';
import filesReducers from '../pages/files/reducers';
import loadingProcess from '../common/reducers/loadingReducer';
import rootSaga from './rootSaga';

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
