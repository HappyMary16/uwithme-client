import {loadState, saveState} from './StateLoader';
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
import {fileApiSlice} from "./file/fileApiSlice";
import {subjectApiSlice} from "./subject/subjectApiSlice";
import messageSlice from "./message/messageSlice";
import botSlice from "./bot/botSlice";

export const store = configureStore({
  preloadedState: {
    auth: loadState("auth"),
    studCabinet: loadState('studCabinet'),
    bot: loadState('bot')
  },
  reducer: {
    auth: authSlice,
    studCabinet: studCabinetSlice,
    message: messageSlice,
    bot: botSlice,
    [studCabinetApiSlice.reducerPath]: studCabinetApiSlice.reducer,
    [tenantApiSlice.reducerPath]: tenantApiSlice.reducer,
    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [groupApiSlice.reducerPath]: groupApiSlice.reducer,
    [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
    [buildingApiSlice.reducerPath]: buildingApiSlice.reducer,
    [lectureHallApiSlice.reducerPath]: lectureHallApiSlice.reducer,
    [fileApiSlice.reducerPath]: fileApiSlice.reducer,
    [subjectApiSlice.reducerPath]: subjectApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      studCabinetApiSlice.middleware,
      tenantApiSlice.middleware,
      departmentApiSlice.middleware,
      userApiSlice.middleware,
      groupApiSlice.middleware,
      lessonApiSlice.middleware,
      buildingApiSlice.middleware,
      lectureHallApiSlice.middleware,
      fileApiSlice.middleware,
      subjectApiSlice.middleware
    )
});

store.subscribe(() => {
  saveState("auth", store.getState().auth);
  saveState("studCabinet", store.getState().studCabinet)
  saveState("bot", store.getState().bot);
});
