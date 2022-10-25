import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    queryPost:[],
    filterType: [],
    orderPosts: [],
    post: [],
    response: [],
  },
  reducers: {
    allPosts: (state, { payload }) => {
      state.allPosts = payload;
      state.queryPost = payload;
      state.filterType = payload;
      state.orderPosts = payload;
    },
    showPost: (state, { payload }) => {
      state.post = payload;
    },
    responsePost: (state, { payload }) => {
      state.response = payload;
    },
    filterType: (state, { payload }) => {
      state.filterType = payload;
    },
    getQuery:(state,{payload})=>{
      state.queryPost = payload;
    },
    order: (state, { payload }) => {
      state.orderPosts = payload;
    },
    clearDetail:(state,{payload})=>{
      state.post = [];
    },
    clearAll:(state,{payload})=>{
      state.orderPosts = [];
    },
    clear:(state)=>{
      state.post=[];
      state.response=[];
    },
  },
});

export const { allPosts, showPost, responsePost, order, filterType,getQuery, clearDetail, clearAll, clear } =
  postSlice.actions;

export default postSlice.reducer;
