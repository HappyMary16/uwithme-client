import StateLoader from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import filesReducers from '../reducers/fileReducers';
import rootSaga from '../sagas/rootSaga';
import scheduleReducers from '../reducers/scheduleReducers';
import lectureHallReducers from '../reducers/lectureHallReducers';
import messageReducers from '../reducers/messageReducers';
import instituteReducers from '../reducers/instituteReducers';
import groupReducers from '../reducers/groupReducers';
import departmentReducers from '../reducers/departmentReducers';
import universityReducers from '../reducers/universityReducers';
import userReducers from '../reducers/userReducers';
import studCabinetReducers from '../reducers/studCabinetReducers';
import authReducers from '../reducers/authReducers';
import navigationReducers from '../reducers/navigationReducers';
import {configureStore} from '@reduxjs/toolkit'
import {authApiSlice} from "./slices/authApiSlice";
import authSlice from "./slices/authSlice";

const stateLoader = new StateLoader();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {
    state: {
      auth: stateLoader.loadState("auth"),
      scheduleReducers: stateLoader.loadState("scheduleReducers"),
      userReducers: stateLoader.loadState("userReducers"),
      authReducers: stateLoader.loadState("authReducers"),
      filesReducers: stateLoader.loadState("filesReducers"),
      navigationReducers: stateLoader.loadState("navigationReducers"),
      lectureHallReducers: stateLoader.loadState("lectureHallReducers"),
      messageReducers: stateLoader.loadState("messageReducers"),
      instituteReducers: stateLoader.loadState("instituteReducers"),
      groupReducers: stateLoader.loadState("groupReducers"),
      universityReducers: stateLoader.loadState("universityReducers"),
      departmentReducers: stateLoader.loadState("departmentReducers"),
      studCabinetReducers: stateLoader.loadState("studCabinetReducers")
    }
  },
  reducer: {
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
    studCabinetReducers,
    auth: authSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(
      authApiSlice.middleware
    )
});

store.subscribe(() => {
  stateLoader.saveState("auth", store.getState().auth);
  stateLoader.saveState("scheduleReducers", store.getState().scheduleReducers);
  stateLoader.saveState("userReducers", store.getState().userReducers);
  stateLoader.saveState("authReducers", store.getState().authReducers);
  stateLoader.saveState("filesReducers", store.getState().filesReducers);
  stateLoader.saveState("navigationReducers", store.getState().navigationReducers);
  stateLoader.saveState("lectureHallReducers", store.getState().lectureHallReducers);
  stateLoader.saveState("messageReducers", store.getState().messageReducers);
  stateLoader.saveState("instituteReducers", store.getState().instituteReducers);
  stateLoader.saveState("groupReducers", store.getState().groupReducers);
  stateLoader.saveState("universityReducers", store.getState().universityReducers);
  stateLoader.saveState("departmentReducers", store.getState().departmentReducers);
  stateLoader.saveState("studCabinetReducers", store.getState().studCabinetReducers);
});

sagaMiddleware.run(rootSaga);
