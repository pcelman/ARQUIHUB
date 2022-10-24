import { POST } from "../constants";
import { allPosts, showPost, responsePost,clear } from "./postSlice";
const axios = require("axios");

export const getAllPosts = () => {
  return (dispatch) => {
    axios
      .get(POST)
      .then((info) => dispatch(allPosts(info.data)))
      .catch((err) => console.log(err));
  };
};

export const getPost = (id) => {
  return (dispatch) => {
    axios
      .get(`${POST}/${id}`)
      .then((info) => dispatch(showPost(info.data)))
      .catch((err) => console.log(err));
  };
};

export const createPost = (info) => {
  return (dispatch) => {
    axios
      .post(POST,info)
      .then((res) => dispatch(responsePost(res.data)))
      .catch((err) => console.log(err));
  };
};

export const updatePost = (id, info) => {
  return (dispatch) => {
    axios
      .put(`${POST}/${id}`, info)
      .then((res) => dispatch(responsePost(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    axios
      .delete(`${POST}/${id}`)
      .then((res) => dispatch(responsePost(res.data)))
      .catch((err) => console.log(err));
  };
};

export const clearResponsePost=(id)=>{
  return clear() 
}