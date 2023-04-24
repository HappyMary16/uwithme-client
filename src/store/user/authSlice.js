import {createSlice} from "@reduxjs/toolkit";
import {ADMIN, STUDENT, TEACHER} from "../../constants/userRoles";
import {userApiSlice} from "./userApiSlice";
import {getId} from "../../services/authService";
import {signOut} from "../actions";

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
      .addMatcher(userApiSlice.endpoints.fetchUser.matchFulfilled, (state, {payload}) => {
        if (payload.id === getId()) {
          state.activeRole = state.activeRole ?? getDefaultActiveRole(payload.roles);
        }
      })
      .addMatcher(signOut.match, (state) => {
        state.activeRole = null;
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

export default authSlice.reducer;