import { FAVOURITE } from "../constants";
import { responseFavourite } from "./favouriteSlice"
const axios = require("axios");


export const updateFavourite = (post_id, user_id) => {
  return (dispatch) => {
    axios
      .put(`${FAVOURITE}/${post_id}`, user_id)
      .then((res) => dispatch(responseFavourite(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteFavourite = (post_id,user_id) => {
  return (dispatch) => {
    axios
      .delete(`${FAVOURITE}/${post_id}`,{data:user_id})
      .then((res) => dispatch(responseFavourite(res.data)))
      .catch((err) => console.log(err));
  };
};