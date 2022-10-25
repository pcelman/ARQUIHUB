import axios from "axios";
import { PROJECT } from "../constants";
import {
  allProjects,
  showProject,
  responseProject,
  queryProject,
  clear,
} from "./projectSlice";

export const getAllProjects = () => {
  return (dispatch) => {
    axios
      .get(PROJECT)
      .then((info) => dispatch(allProjects(info.data)))
      .catch((err) => console.log(err));
  };
};

export const getProject = (id) => {
  return (dispatch) => {
    axios
      .get(`${PROJECT}/${id}`)
      .then((info) => dispatch(showProject(info.data)))
      .catch((err) => console.log(err));
  };
};

export const createProject = (info) => {
  console.log(info)
  return (dispatch) => {
    axios
      .post(PROJECT, info)
      .then((res) => dispatch(responseProject(res.data)))
      .catch((err) => console.log(err));
  };
};

export const updateProject = (id, info) => {
  return (dispatch) => {
    axios
      .put(`${PROJECT}/${id}`, info)
      .then((res) => dispatch(responseProject(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    axios
      .delete(`${PROJECT}/${id}`)
      .then((res) => dispatch(responseProject(res.data)))
      .catch((err) => console.log(err));
  };
};

export function getQueryProjects(allProjects, name) {
  const allProjects2 = [...allProjects];
  return name
    ? queryProject(
        allProjects2.filter(
          (e) => e.title && e.title.toLowerCase().includes(name.toLowerCase())
        )
      )
    : queryProject(allProjects);
}

export const clearResponseProject=(id)=>{
  return clear() 
}