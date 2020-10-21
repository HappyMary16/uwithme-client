import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import authReducers from '../pages/authorization/signIn/reducers';
import filesReducers from '../pages/user/files/reducers';
import loadingProcess from '../pages/navigation/loadingReducer';
import rootSaga from './rootSaga';
import adminReducers from '../pages/admin/structure/reducers';
import usersReducer from '../pages/user/reducer';
import scheduleReducers from '../pages/user/schedule/reducers';
import lectureHallReducer from '../pages/admin/lectureHalls/reducers';

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
