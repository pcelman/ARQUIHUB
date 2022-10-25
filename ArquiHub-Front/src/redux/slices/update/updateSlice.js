import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    allUpdates: [],
    update: [],
    response: {},
  },
  reducers: {
    allUpdates: (state, { payload }) => {
      state.allProjects = payload;
    },
    showUpdate: (state, { payload }) => {
      state.project = payload;
    },
    responseUpdate: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { allUpdates, showUpdate, responseUpdate } = updateSlice.actions;

export default updateSlice.reducer;
