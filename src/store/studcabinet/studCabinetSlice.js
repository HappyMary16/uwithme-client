import {createSlice} from "@reduxjs/toolkit";
import {studCabinetApiSlice} from "./studCabinetApiSlice";
import {signOut} from "../actions";

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
      .addMatcher(signOut.match, (state) => {
        state.semester = null;
        state.credentials = null;
      })
  }
});

export const selectCredentials = (state) => state.studCabinet.credentials;
export default studCabinetSlice.reducer;