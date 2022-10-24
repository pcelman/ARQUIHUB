import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    allReviews: [],
    review: [],
    response: {},
  },
  reducers: {
    allReviews: (state, { payload }) => {
      state.allReviews = payload;
    },
    showReview: (state, { payload }) => {
      state.review = payload;
    },
    responseReview: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export const { allReviews, showReview, responseReview } = reviewSlice.actions;

export default reviewSlice.reducer;
