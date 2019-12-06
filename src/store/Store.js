import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import infoReducers from '../reducers';
import rootSaga from '../sagas';
import authReducers from '../pages/authorization/reducers';
import { loadDepartments, loadGroups, loadInstitutes } from '../actions';
import userReducers from '../pages/student/reducers';

export default function createAppStore() {
  const stateLoader = new StateLoader();
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    infoReducers,
    authReducers,
    userReducers
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

  store.dispatch(loadInstitutes());
  store.dispatch(loadDepartments());
  store.dispatch(loadGroups());

  return store;
}
