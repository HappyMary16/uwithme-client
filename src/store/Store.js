import {loadState, saveState} from './StateLoader';
import createSagaMiddleware from 'redux-saga';
import filesReducers from '../reducers/fileReducers';
import rootSaga from '../sagas/rootSaga';
import scheduleReducers from '../reducers/scheduleReducers';
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

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {
    auth: loadState("auth"),
    studCabinet: loadState('studCabinet'),
    scheduleReducers: loadState("scheduleReducers"),
    filesReducers: loadState("filesReducers"),
    navigationReducers: loadState("navigationReducers"),
    messageReducers: loadState("messageReducers")
  },
  reducer: {
    scheduleReducers,
    filesReducers,
    navigationReducers,
    messageReducers,
    auth: authSlice,
    studCabinet: studCabinetSlice,
    [studCabinetApiSlice.reducerPath]: studCabinetApiSlice.reducer,
    [tenantApiSlice.reducerPath]: tenantApiSlice.reducer,
    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [groupApiSlice.reducerPath]: groupApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(
      studCabinetApiSlice.middleware,
      tenantApiSlice.middleware,
      departmentApiSlice.middleware,
      userApiSlice.middleware,
      groupApiSlice.middleware
    )
});

store.subscribe(() => {
  saveState("auth", store.getState().auth);
  saveState("studCabinet", store.getState().studCabinet)
  saveState("scheduleReducers", store.getState().scheduleReducers);
  saveState("filesReducers", store.getState().filesReducers);
  saveState("navigationReducers", store.getState().navigationReducers);
  saveState("messageReducers", store.getState().messageReducers);
  saveState("groupReducers", store.getState().groupReducers);
});

sagaMiddleware.run(rootSaga);
