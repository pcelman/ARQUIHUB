import axios from "axios";
import { UPDATE } from "../constants";
import { allUpdates, showUpdate, responseUpdate } from "./updateSlice";

export const createUpdate = (info) => {
  console.log(info);
  return function (dispatch) {
    axios
      .post(UPDATE, info)
      .then((res) => dispatch(responseUpdate(res.data)))
      .catch((err) => console.log(err));
  };
};

export const editUpdate = (id, info) => {
    return function (dispatch) {
        axios.put(`${UPDATE}/${id}`, info)
        .then((res) => dispatch(responseUpdate(res.data)))
        .catch((err) => console.log(err));
    }
}
