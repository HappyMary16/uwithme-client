import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice";
import * as config from "../../config";
import {SIGN_OUT} from "../../actions/authActions";
import {ADMIN, STUDENT, TEACHER} from "../../constants/userRoles";

const initialState = {
  activeRole: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    roleActivated: (state, {payload}) => {
      state.activeRole = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApiSlice.endpoints.fetchUser.matchFulfilled, (state, {payload}) => {
        state.activeRole = state.activeRole ?? getDefaultActiveRole(payload.roles);
        state.clientVersion = config.CLIENT_VERSION;
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.activeRole = null;
          state.clientVersion = config.CLIENT_VERSION;
        })
  }
});

function getDefaultActiveRole(roles) {
  if (roles.includes(STUDENT)) {
    return STUDENT;
  }

  if (roles.includes(TEACHER)) {
    return TEACHER;
  }

  if (roles.includes(ADMIN)) {
    return ADMIN;
  }
}

export const {roleActivated} = authSlice.actions;

export const selectActiveRole = (state) => state.auth.activeRole;
export const selectClientVersion = (state) => state.auth.clientVersion;

export default authSlice.reducer;