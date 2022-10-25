import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slices/sliceNews/newsSlice"
import projectReducer from "./slices/project/projectSlice";
import  postReducer  from "./slices/post/postSlice";
import headerReducer from "./slices/header/headerSlice"
import userProjectReducer from "./slices/userProject/userProjectSlice";
import favouriteReducer from "./slices/favourite/favouriteSlice";
import userReducer from "./slices/user/userSlice";
import loginReducer from "./slices/auth/loginSlice"
import reviewReducer from "./slices/review/reviewSlice";
import updateReducer from "./slices/update/updateSlice"
import storageReducer from "./slices/storage/storageSlice"
import reviewReportReducer from "./slices/reviewReport/reviewReportSlice";
import downloadReducer from "./slices/downolad/downloadSlice";
import paymentReducer from "./slices/payment/paymentSlice"
export const store = configureStore({
  reducer:{
    post: postReducer,
    newsSlice: newsSlice,
    header: headerReducer,
    project:projectReducer,
    userProject:userProjectReducer,
    favourite:favouriteReducer,
    user:userReducer,
    login:loginReducer,
    review:reviewReducer,
    update: updateReducer,
    storage: storageReducer,
    reviewReport:reviewReportReducer,
    download: downloadReducer,
    payment: paymentReducer,
  },
});