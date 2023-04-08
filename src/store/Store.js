import {loadState, saveState} from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import filesReducers from '../reducers/fileReducers';
import rootSaga from '../sagas/rootSaga';
import messageReducers from '../reducers/messageReducers';
import navigationReducers from '../reducers/navigationReducers';
import {configureStore} from '@reduxjs/toolkit'
import authSlice from "./user/authSlice";
import studCabinetSlice from "./studcabinet/studCabinetSlice";
import {studCabinetApiSlice} from "./studcabinet/studCabinetApiSlice";
import {tenantApiSlice} from "./tenant/tenantApiSlice";
import {departmentApiSlice} from "./department/departmentApiSlice";
import {userApiSlice} from "./user/userApiSlice";
import {groupApiSlice} from "./group/groupApiSlice";
import {lessonApiSlice} from "./lesson/lessonApiSlice";
import {buildingApiSlice} from "./lecturehall/buildingApiSlice";
import {lectureHallApiSlice} from "./lecturehall/lectureHallApiSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {
    auth: loadState("auth"),
    studCabinet: loadState('studCabinet'),
    filesReducers: loadState("filesReducers"),
    navigationReducers: loadState("navigationReducers"),
    messageReducers: loadState("messageReducers")
  },
  reducer: {
    filesReducers,
    navigationReducers,
    messageReducers,
    auth: authSlice,
    studCabinet: studCabinetSlice,
    [studCabinetApiSlice.reducerPath]: studCabinetApiSlice.reducer,
    [tenantApiSlice.reducerPath]: tenantApiSlice.reducer,
    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [groupApiSlice.reducerPath]: groupApiSlice.reducer,
    [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
    [buildingApiSlice.reducerPath]: buildingApiSlice.reducer,
    [lectureHallApiSlice.reducerPath]: lectureHallApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(
      studCabinetApiSlice.middleware,
      tenantApiSlice.middleware,
      departmentApiSlice.middleware,
      userApiSlice.middleware,
      groupApiSlice.middleware,
      lessonApiSlice.middleware,
      buildingApiSlice.middleware,
      lectureHallApiSlice.middleware
    )
});

store.subscribe(() => {
  saveState("auth", store.getState().auth);
  saveState("studCabinet", store.getState().studCabinet)
  saveState("filesReducers", store.getState().filesReducers);
  saveState("navigationReducers", store.getState().navigationReducers);
  saveState("messageReducers", store.getState().messageReducers);
});

sagaMiddleware.run(rootSaga);
