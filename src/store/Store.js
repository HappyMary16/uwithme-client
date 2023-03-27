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
    ...stateLoader.loadState()
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
  stateLoader.saveState(store.getState());
});

sagaMiddleware.run(rootSaga);
