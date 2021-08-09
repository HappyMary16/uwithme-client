import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import authReducers from '../pages/authorization/reducers';
import filesReducers from '../pages/user/files/reducers';
import loadingProcess from '../pages/navigation/loadingReducer';
import rootSaga from '../sagas/rootSaga';
import scheduleReducers from '../reducers/scheduleReducers';
import lectureHallReducer from '../pages/admin/lectureHalls/reducers';
import messageReducers from '../reducers/messageReducers';
import instituteReducers from '../reducers/instituteReducers';
import groupReducers from '../reducers/groupReducers';
import departmentReducers from '../reducers/departmentReducers';
import universityReducers from '../reducers/universityReducers';
import userReducers from '../reducers/userReducers';
import studCabinetReducers from '../reducers/studCabinetReducers';

export const history = createBrowserHistory();

export default function createAppStore() {
  const stateLoader = new StateLoader();
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    router: connectRouter(history),
    scheduleReducers,
    userReducers,
    authReducers,
    filesReducers,
    loadingProcess,
    lectureHallReducer,
    messageReducers,
    instituteReducers,
    groupReducers,
    universityReducers,
    departmentReducers,
    studCabinetReducers
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
