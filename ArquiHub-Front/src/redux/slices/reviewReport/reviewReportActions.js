import { REVIEWREPORT } from "../constants";
import { allReviewReports, responseReviewReport,order ,filter, query } from "./reviewReportSlice"
const axios = require("axios");

export const getAllReviewReports = () => {
  return (dispatch) => {
    axios
      .get(REVIEWREPORT)
      .then((info) => dispatch(allReviewReports(info.data)))
      .catch((err) => console.log(err));
  };
};

/* export const getReview = (id,mood) => {
  return (dispatch) => {
    axios
      .get(`${REVIEW}/${id}/${mood}`)
      .then((info) => dispatch(showReviewReport(info.data)))
      .catch((err) => console.log(err));
  };
}; */

export const createReviewReport = (info) => {
  return (dispatch) => {
    axios
      .post(REVIEWREPORT, info)
      .then((res) => dispatch(responseReviewReport(res.data)))
      .catch((err) => console.log(err));
  };
};

export const updateReviewReport = (id, info) => {
  return (dispatch) => {
    axios
      .put(`${REVIEWREPORT}/${id}`, info)
      .then((res) => dispatch(responseReviewReport(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteReviewReport = (id) => {
  return (dispatch) => {
    axios
      .delete(`${REVIEWREPORT}/${id}`)
      .then((res) => dispatch(responseReviewReport(res.data)))
      .catch((err) => console.log(err));
  };
};

export const orderReviewReport = (filter, type) => {
  const orderMethod = {
    default: { method: (a, b) => (a.id > b.id ? 1 : -1) },
    Az: { method: (a, b) => (a.user_id.nickname> b.user_id.nickname ? -1 : 1) },
    Za: { method: (a, b) => (a.user_id.nickname > b.user_id.nickname ? 1 : -1) },
  };
  const filterF = [...filter];
  return type?order(filterF.sort(orderMethod[type].method)):order(filter);
};

export const filterReviewReport = (allReviewReports, type) => {
  const allReviewReports2 = [...allReviewReports]
return filter(type !== "default"?allReviewReports2.filter(e=>e.value===type):allReviewReports)
};


export function getQueryReviewReport(allReports, name) {
  const allReports2 = [...allReports]
  return name?query(allReports2.filter((e) => e.review_id.user_id.nickname.toLowerCase().includes(name.toLowerCase()))):query(allReports)
};

