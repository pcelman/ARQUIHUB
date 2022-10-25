import { USERS } from "../constants";
import {
  allUsers,
  showUser,
  responseUser,
  order,
  queryUser,
  showUserProfile,
  clear,
} from "./userSlice";
const axios = require("axios");
export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get(USERS)
      .then((info) => dispatch(allUsers(info.data)))
      .catch((err) => console.log(err));
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${USERS}/${id}`)
      .then((info) => dispatch(showUser(info.data)))
      .catch((err) => console.log(err));
  };
};

export const createUser = (id, info) => {
  console.log(info)
  return (dispatch) => {
    axios
      .post(`${USERS}/${id}`, info)
      .then((res) => dispatch(responseUser(res.data)))
      .catch((err) => console.log(err));
  };
};

export const updateUser = (id, info) => {
  console.log(info);
  return (dispatch) => {
    axios
      .put(`${USERS}/${id}`, info)
      .then((res) => dispatch(responseUser(res.data)))
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete(`${USERS}/${id}`)
      .then((res) => dispatch(responseUser(res.data)))
      .catch((err) => console.log(err));
  };
};

export function getQueryUser(allUsers, name) {
  const allUsers2 = [...allUsers];
  return name
    ? queryUser(
        allUsers2.filter((e) => {
          return (
            (e.nickname &&
              e.nickname.toLowerCase().includes(name.toLowerCase())) ||
            (e.name &&
              e.lastname &&
              (e.name + " " + e.lastname)
                .toLowerCase()
                .includes(name.toLowerCase())) ||
            (e.email && e.email.toLowerCase().includes(name.toLowerCase()))
          );
        })
      )
    : queryUser(allUsers);
}

export const orderUsers = (filter, type) => {
  const orderMethod = {
    default: { method: (a, b) => (a.id > b.id ? 1 : -1) },
    Az: { method: (a, b) => (a.nickname > b.nickname ? -1 : 1) },
    Za: { method: (a, b) => (a.nickname > b.nickname ? 1 : -1) },
  };
  const filterF = [...filter];
  return type ? order(filterF.sort(orderMethod[type].method)) : order(filter);
};

export const getViewUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${USERS}/${id}`)
      .then((info) => dispatch(showUserProfile(info.data)))
      .catch((err) => console.log(err));
  };
};

export const clearResponseUser=(id)=>{
  return clear() 
}