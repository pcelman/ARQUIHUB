import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    detail: {},
    queryNews:[],
    order:[],
  },
  reducers: {
    getNews: (state, action) => {
      state.news = action.payload;
      state.queryNews=action.payload;
      state.order=action.payload;
    },
    queryNews: (state, action) => {
      state.queryNews = action.payload;
    },
    order: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { getNews, queryNews, order } = newsSlice.actions;
export default newsSlice.reducer;
