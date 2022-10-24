import axios from "axios";
import { STORAGE } from "../constants";
import { allStorages, showStorage, responseStorage } from "./storageSlice";

export const getStorages = () => {
  return function (dispatch) {
    axios
      .get(STORAGE)
      .then((res) => dispatch(allStorages(res.data)))
      .catch((err) => console.log(err));
  };
};

export const getStorageById = (id) => {
  console.log(id);
    return function (dispatch) {
        axios.get(`${STORAGE}/${id}`)
        .then((res) => dispatch(showStorage(res.data)))
    }
}

export const createStorage = (data) => {
  return function (dispatch) {
    axios
      .post(STORAGE, data)
      .then((res) => dispatch(responseStorage(res.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteStorage = (id) => {
  return function (dispatch) {
    axios
      .delete(`${STORAGE}/${id}`)
      .then((res) => dispatch(responseStorage(res.data)))
      .catch((err) => console.log(err));
  };
}
