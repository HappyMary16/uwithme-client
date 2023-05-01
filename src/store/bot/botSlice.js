import {createSlice} from "@reduxjs/toolkit";

const botSlice = createSlice({
  name: 'bot',
  initialState: {},
  reducers: {
    botShown: (state) => {
      state.shown = true;
    }
  }
});

export const {botShown} = botSlice.actions;
export const selectBotShown = (state) => state.bot.shown;
export default botSlice.reducer;