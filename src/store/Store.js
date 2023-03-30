import {loadState, saveState} from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import filesReducers from '../reducers/fileReducers';
import rootSaga from '../sagas/rootSaga';
import scheduleReducers from '../reducers/scheduleReducers';
import lectureHallReducers from '../reducers/lectureHallReducers';
import messageReducers from '../reducers/messageReducers';
import groupReducers from '../reducers/groupReducers';
import userReducers from '../reducers/userReducers';
import authReducers from '../reducers/authReducers';
import navigationReducers from '../reducers/navigationReducers';
import {configureStore} from '@reduxjs/toolkit'
import {authApiSlice} from "./slices/authApiSlice";
import authSlice from "./slices/authSlice";
import studCabinetSlice from "./slices/studCabinetSlice";
import {studCabinetApiSlice} from "./slices/studCabinetApiSlice";
import {tenantApiSlice} from "./slices/tenantApiSlice";
import {departmentApiSlice} from "./slices/departmentApiSlice";

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
    groupReducers: loadState("groupReducers")
  },
  reducer: {
    scheduleReducers,
    userReducers,
    authReducers,
    filesReducers,
    navigationReducers,
    lectureHallReducers,
    messageReducers,
    groupReducers,
    auth: authSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    studCabinet: studCabinetSlice,
    [studCabinetApiSlice.reducerPath]: studCabinetApiSlice.reducer,
    [tenantApiSlice.reducerPath]: tenantApiSlice.reducer,
    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(
      authApiSlice.middleware,
      studCabinetApiSlice.middleware,
      tenantApiSlice.middleware,
      departmentApiSlice.middleware
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
  saveState("groupReducers", store.getState().groupReducers);
});

sagaMiddleware.run(rootSaga);
