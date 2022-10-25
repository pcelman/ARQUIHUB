import { NEWS } from "../constants";
import newsSlice from "./newsSlice";
import { getNews, queryNews, order } from "./newsSlice";
const axios = require("axios");

export function getNews1() {
  return function (dispatch) {
    axios
      .get(NEWS)
      .then((res) => dispatch(getNews(res.data)))
      .catch((error) => console.log(error));
  };
}

export function getQueryNews(allNews, name) {
  const allNews2 = [...allNews]
  return name?queryNews(allNews2.filter((e) => e.title && e.title.toLowerCase().includes(name.toLowerCase()))):queryNews(allNews)
};

export const orderNews = (filter, type) => {
  const orderMethod = {
    default: { method: (a, b) => (a.id > b.id ? 1 : -1) },
    Az: { method: (a, b) => (a.title> b.title ? 1 : -1) },
    Za: { method: (a, b) => (a.title > b.title ? -1 : 1) },
    recent: {
      method: (a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1),
    },
    old: { method: (a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1) },
  };
  const filterF = [...filter];
  return type?order(filterF.sort(orderMethod[type].method)):order(filter);
};