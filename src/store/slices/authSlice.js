import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice";
import {getDefaultActiveRole} from "../../utils/UsersUtil";
import * as config from "../../config";
import {SIGN_OUT} from "../../actions/authActions";

const initialState = {
  activeRole: null,
  registrationCompleted: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activeRoleChanged: (state, {payload}) => {
      state.activeRole = payload;
    },
    registrationCompleted: (state, {payload}) => {
      state.registrationCompleted = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApiSlice.endpoints.fetchUser.matchFulfilled, (state) => {
        state.activeRole = state.activeRole ?? getDefaultActiveRole();
        state.registrationCompleted = true;
        state.clientVersion = config.CLIENT_VERSION;
      })
      .addMatcher(authApiSlice.endpoints.fetchUser.matchRejected, (state, {payload}) => {
        if (payload.status === 404) {
          state.registrationCompleted = false;
        }
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.activeRole = null;
          state.registrationCompleted = true;
          state.clientVersion = config.CLIENT_VERSION;
        })
  }
});

export const {activeRoleChanged, registrationCompleted} = authSlice.actions;

export const selectActiveRole = (state) => state.activeRole;
export const selectRegistrationCompleted = (state) => state.registrationCompleted;

export default authSlice.reducer;