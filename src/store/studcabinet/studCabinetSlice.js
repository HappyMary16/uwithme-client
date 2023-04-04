import {createSlice} from "@reduxjs/toolkit";
import {SIGN_OUT} from "../../actions/authActions";
import {studCabinetApiSlice} from "./studCabinetApiSlice";

const initialState = {
  semester: null,
  credentials: null
};

const studCabinetSlice = createSlice({
  name: 'studCabinet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(studCabinetApiSlice.endpoints.fetchStudentInfo.matchFulfilled, (state, {payload, meta}) => {
        let semester = payload.course * 2;
        if (new Date().getMonth() < 12) {
          semester--;
        }
        if (new Date().getMonth() < 10) {
          semester--;
        }

        state.semester = semester;
        state.credentials = {
          email: meta.arg.originalArgs.email,
          password: meta.arg.originalArgs.password
        };
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.semester = null;
          state.credentials = null;
        })
  }
});

export const selectCredentials = (state) => state.studCabinet.credentials;
export default studCabinetSlice.reducer;