import { createSlice } from "@reduxjs/toolkit";

export const userProjectSlice = createSlice({
  name: "userProject",
  initialState: {
    response: {},
  },
  reducers: {
    responseUserProject: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { responseUserProject } = userProjectSlice.actions;

export default userProjectSlice.reducer;
