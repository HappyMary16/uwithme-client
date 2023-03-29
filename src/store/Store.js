import {loadState, saveState} from './StateLoader';
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
import authReducers from '../reducers/authReducers';
import navigationReducers from '../reducers/navigationReducers';
import {configureStore} from '@reduxjs/toolkit'
import {authApiSlice} from "./slices/authApiSlice";
import authSlice from "./slices/authSlice";
import studCabinetSlice from "./slices/studCabinetSlice";
import {studCabinetApiSlice} from "./slices/studCabinetApiSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {
    auth: loadState("auth"),
    studCabinet: loadState('studCabinet'),
    scheduleReducers: loadState("scheduleReducers"),
    userReducers: loadState("userReducers"),
    authReducers: loadState("authReducers"),
    filesReducers: loadState("filesReducers"),
    navigationReducers: loadState("navigationReducers"),
    lectureHallReducers: loadState("lectureHallReducers"),
    messageReducers: loadState("messageReducers"),
    instituteReducers: loadState("instituteReducers"),
    groupReducers: loadState("groupReducers"),
    universityReducers: loadState("universityReducers"),
    departmentReducers: loadState("departmentReducers")
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
    auth: authSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    studCabinet: studCabinetSlice,
    [studCabinetApiSlice.reducerPath]: studCabinetApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(
      authApiSlice.middleware,
      studCabinetApiSlice.middleware
    )
});

store.subscribe(() => {
  saveState("auth", store.getState().auth);
  saveState("studCabinet", store.getState().studCabinet)
  saveState("scheduleReducers", store.getState().scheduleReducers);
  saveState("userReducers", store.getState().userReducers);
  saveState("authReducers", store.getState().authReducers);
  saveState("filesReducers", store.getState().filesReducers);
  saveState("navigationReducers", store.getState().navigationReducers);
  saveState("lectureHallReducers", store.getState().lectureHallReducers);
  saveState("messageReducers", store.getState().messageReducers);
  saveState("instituteReducers", store.getState().instituteReducers);
  saveState("groupReducers", store.getState().groupReducers);
  saveState("universityReducers", store.getState().universityReducers);
  saveState("departmentReducers", store.getState().departmentReducers);
});

sagaMiddleware.run(rootSaga);
