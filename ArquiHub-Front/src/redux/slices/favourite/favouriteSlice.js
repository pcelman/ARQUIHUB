import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    response: {},
  },
  reducers: {
    responseFavourite: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { responseFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
