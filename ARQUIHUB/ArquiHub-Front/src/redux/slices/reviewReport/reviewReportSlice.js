import { createSlice } from "@reduxjs/toolkit";

export const reviewReportSlice = createSlice({
  name: "reviewreport",
  initialState: {
    allReviewReports: [],
    reviewReport: [],
    queryReviewReports:[],
    orderReviewReports:[],
    filterReviewReports:[],

    response: {},
  },
  reducers: {
    allReviewReports: (state, { payload }) => {
      state.allReviewReports = payload;
      state.queryReviewReports= payload;
      state.orderReviewReports = payload;
      state.filterReviewReports = payload;  
    },
    showReviewReport: (state, { payload }) => {
      state.reviewReport = payload;
    },
    responseReviewReport: (state, { payload }) => {
      state.response = payload;
    },
    query:(state,{payload})=>{
      state.queryReviewReports = payload;
    },
    filter:(state,{payload})=>{
      state.filterReviewReports = payload;
    },
    order:(state,{payload})=>{
      state.orderReviewReports = payload;
    },
    

  },
});

export const { allReviewReports, showReviewReport, responseReviewReport,query ,filter ,order} = reviewReportSlice.actions;

export default reviewReportSlice.reducer;
