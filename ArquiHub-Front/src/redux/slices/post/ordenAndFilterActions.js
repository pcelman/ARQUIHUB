import { order, filterType, getQuery, clearDetail, clearAll } from "./postSlice";

export const filterTypePost = (allPosts, type) =>{
   return type !== "default" && type
    ? filterType(allPosts.filter((e) => e.project_type === type))
    : filterType(allPosts);}

export const orderPosts = (filter, type) => {
  const orderMethod = {
    default: { method: (a, b) => (a._id > b._id ? 1 : -1) },
    large: { method: (a, b) => (Number(a.mts2) > Number(b.mts2) ? -1 : 1) },
    small: { method: (a, b) => (Number(a.mts2) > Number(b.mts2) ? 1 : -1) },
    recent: {
      method: (a, b) => (new Date(a.year) > new Date(b.year) ? 1 : -1),
    },
    old: { method: (a, b) => (new Date(a.year) > new Date(b.year) ? -1 : 1) },
  };
  const filterF = [...filter];
  return type?order(filterF.sort(orderMethod[type].method)):order(filter);
};

export function getQueryPost(allPosts, name) {
  const allPosts2 = [...allPosts]
  return name?getQuery(allPosts2.filter((e) => e.title.toLowerCase().includes(name.toLowerCase()))):getQuery(allPosts)
};

export const  clearAllPosts = ()=> clearAll();

  export const clearPostDetail = () => clearDetail();