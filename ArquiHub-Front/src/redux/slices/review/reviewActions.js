import { REVIEW } from "../constants";
import { allReviews, showReview, responseReview } from "./reviewSlice"
const axios = require("axios");

export const getAllReviews = () => {
  return (dispatch) => {
    axios
      .get(REVIEW)
      .then((info) => dispatch(allReviews(info.data)))
      .catch((err) => console.log(err));
  };
};

export const getReview = (id,mood) => {
  return (dispatch) => {
    axios
      .get(`${REVIEW}/${id}/${mood}`)
      .then((info) => dispatch(showReview(info.data)))
      .catch((err) => console.log(err));
  };
};

export const createReview = (info) => {
  return (dispatch) => {
    axios
      .post(REVIEW, info)
      .then((res) => dispatch(responseReview(res.data)))
      .catch((err) => console.log(err));
  };
};

export const updateReview = (id, info) => {
  return (dispatch) => {
    axios
      .put(`${REVIEW}/${id}`, info)
      .then((res) => dispatch(responseReview(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteReview = (id) => {
  return (dispatch) => {
    axios
      .delete(`${REVIEW}/${id}`)
      .then((res) => dispatch(responseReview(res.data)))
      .catch((err) => console.log(err));
  };
};
