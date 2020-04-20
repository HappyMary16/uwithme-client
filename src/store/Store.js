import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import authReducers from '../pages/authorization/reducers';
import filesReducers from '../pages/files/reducers';
import loadingProcess from '../common/reducers/loadingReducer';
import rootSaga from './rootSaga';
import adminReducers from '../pages/administration/structure/reducers';
import usersReducer from '../pages/users/reducer';
import scheduleReducers from '../pages/schedule/reducers';
import lectureHallReducer from '../pages/administration/lectureHalls/reducer';

export const history = createBrowserHistory();

export default function createAppStore() {
  const stateLoader = new StateLoader();
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    router: connectRouter(history),
    scheduleReducers: scheduleReducers,
    usersReducer: usersReducer,
    authReducers: authReducers,
    filesReducers: filesReducers,
    loadingProcess: loadingProcess,
    adminReducers: adminReducers,
    lectureHallReducer: lectureHallReducer
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
