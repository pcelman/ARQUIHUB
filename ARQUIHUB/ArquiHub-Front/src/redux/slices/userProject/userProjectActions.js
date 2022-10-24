import { USER_PROJECT } from "../constants";
import { responseUserProject } from "./userProjectSlice";
const axios = require("axios");

export const updateUserProject = (project_id, info) => {
  return (dispatch) => {
    axios
      .put(`${USER_PROJECT}/${project_id}`, info)
      .then((res) => dispatch(responseUserProject(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteUserProject = (project_id,info) => {
  return (dispatch) => {
    axios
      .delete(`${USER_PROJECT}/${project_id}`,info)
      .then((res) => dispatch(responseUserProject(res.data)))
      .catch((err) => console.log(err));
  };
};

