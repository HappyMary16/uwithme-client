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
        if (!payload) {
          return;
        }

        let semester = payload.course * 2;
        if (new Date().getMonth() >= 8) {
          semester--;
        }

        state.semester = semester;
        if (!state.credentials) {
          state.credentials = {
            email: meta.arg.originalArgs.email,
            password: meta.arg.originalArgs.password,
            marks: generateMarks(payload.studentId, payload.groupId)
          };
        }
      })
      .addMatcher(signOut.match, (state) => {
        state.semester = null;
        state.credentials = null;
      })
  }
});

export const selectCredentials = (state) => state.studCabinet.credentials;
export const selectSemester = (state) => state.studCabinet.semester;

export default studCabinetSlice.reducer;

// It was added just because of Stud cabinet specifics
function generateMarks(cod, gid) {
  const length = parseInt(cod.charAt(0) + cod.charAt(2) + cod.charAt(4));
  const result = new Array(length);
  const r = parseInt(gid.charAt(1) + gid.charAt(2) + gid.charAt(3));
  for (let i = 0; i < length; i++) {
    const e = r - 100 + Math.floor(200 * Math.random());
    result[i] = i === Math.round(length / 3) || i === Math.round(length / 2) ? r : e
  }
  return result;
}