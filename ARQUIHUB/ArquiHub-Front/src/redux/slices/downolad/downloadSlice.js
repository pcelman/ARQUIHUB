import { createSlice } from "@reduxjs/toolkit";

export const downloadSlice = createSlice({
  name: "download",
  initialState: {
    response: {},
  },
  reducers: {
    responseDownload: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { responseDownload} = downloadSlice.actions;

export default downloadSlice.reducer;
