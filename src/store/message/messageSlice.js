import {createSlice} from "@reduxjs/toolkit";
import {SIGN_OUT} from "../../actions/authActions";
import {fileApiSlice} from "../file/fileApiSlice";
import {getMessage} from "../../utils/MessageUtil";
import {lessonApiSlice} from "../lesson/lessonApiSlice";
import i18n from "../../locales/i18n";

const initialState = {
  message: null,
  errors: []
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageAdded: (state, message) => {
      state.message = message;
    },
    messageRemoved: (state) => {
      state.message = null;
    },
    errorAdded: (state, error) => {
      if (error?.status !== 404 && error?.data?.status !== 403) {
        state.errors = [...state.errors, {
          id: new Date().getTime(),
          message: getMessage(error),
          error: error
        }]
      }
    },
    errorRemoved: (state, errorId) => {
      state.errors = state.errors.filter(error => errorId !== error.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(fileApiSlice.endpoints.addAccessToFiles.matchFulfilled, (state) => {
        state.message = i18n.t("Доступ надано");
      })
      .addMatcher(lessonApiSlice.endpoints.saveLessons.matchFulfilled, (state) => {
        state.message = i18n.t("Пари додані в розклад");
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.message = null;
          state.errors = null;
        })
  }
});

export const {
  messageAdded,
  messageRemoved,
  errorAdded,
  errorRemoved
} = messageSlice.actions;

export const selectMessage = (state) => state.message.message;
export const selectErrors = (state) => state.message.errors;

export default messageSlice.reducer;