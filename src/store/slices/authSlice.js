import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice";
import {getDefaultActiveRole} from "../../utils/UsersUtil";
import * as config from "../../config";
import {SIGN_OUT} from "../../actions/authActions";

const initialState = {
  activeRole: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activeRoleChanged: (state, {payload}) => {
      state.activeRole = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApiSlice.endpoints.fetchUser.matchFulfilled, (state) => {
        state.activeRole = state.activeRole ?? getDefaultActiveRole();
        state.clientVersion = config.CLIENT_VERSION;
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.activeRole = null;
          state.clientVersion = config.CLIENT_VERSION;
        })
  }
});

export const {activeRoleChanged} = authSlice.actions;

export const selectActiveRole = (state) => state.auth.activeRole;
export const selectClientVersion = (state) => state.auth.clientVersion;

export default authSlice.reducer;