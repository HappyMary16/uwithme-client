import StateLoader from "./StateLoader";
import createSagaMiddleware from "redux-saga";
import { connectRouter } from "connected-react-router";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import filesReducers from "../reducers/fileReducers";
import rootSaga from "../sagas/rootSaga";
import scheduleReducers from "../reducers/scheduleReducers";
import lectureHallReducers from "../reducers/lectureHallReducers";
import messageReducers from "../reducers/messageReducers";
import instituteReducers from "../reducers/instituteReducers";
import groupReducers from "../reducers/groupReducers";
import departmentReducers from "../reducers/departmentReducers";
import universityReducers from "../reducers/universityReducers";
import userReducers from "../reducers/userReducers";
import studCabinetReducers from "../reducers/studCabinetReducers";
import authReducers from "../reducers/authReducers";
import navigationReducers from "../reducers/navigationReducers";

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
    navigationReducers,
    lectureHallReducers,
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
