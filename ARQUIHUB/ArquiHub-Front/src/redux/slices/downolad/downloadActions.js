import { DOWNLOAD } from "../constants";
import { responseDownload } from "./downloadSlice";
const axios = require("axios");

export const createDownload = (info) => {
  return (dispatch) => {
    console.log(info);
    axios
      .post(DOWNLOAD, info)
      .then((res) => dispatch(responseDownload(res.data)))
      .catch((err) => console.log(err));
  };
};
