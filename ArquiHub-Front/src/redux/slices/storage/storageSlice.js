import { createSlice } from "@reduxjs/toolkit";

export const storageSlice = createSlice({
  name: "storage",
  initialState: {
    allstorages: [],
    storage: [],
    response: {},
  },
  reducers: {
    allstorages: (state, { payload }) => {
      state.allProjects = payload;
    },
    showStorage: (state, { payload }) => {
      state.storage = payload;
    },
    responseStorage: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { allStorages, showStorage, responseStorage } = storageSlice.actions;

export default storageSlice.reducer;
