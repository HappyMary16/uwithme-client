import {createSlice} from "@reduxjs/toolkit";
import {SIGN_OUT} from "../../actions/authActions";
import {fileApiSlice} from "../file/fileApiSlice";

const initialState = {
  messages: []
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageAdded: (state, message) => {
      state.messages = [...state.messages, message];
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(fileApiSlice.endpoints.addAccessToFiles.matchFulfilled, (state) => {
        state.messages = [...state.messages, "Доступ надано"]
      })
      .addMatcher((action) => action.type === SIGN_OUT,
        (state) => {
          state.messages = [];
        })
  }
});

export const {messageAdded} = messageSlice.actions;

export const selectMessages = (state) => state.message.messages;

export default messageSlice.reducer;