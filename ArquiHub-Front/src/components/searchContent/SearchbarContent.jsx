import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getQueryPost } from "../../redux/slices/post/ordenAndFilterActions";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getQueryUser } from "../../redux/slices/user/userActions";
import { getQueryProjects } from "../../redux/slices/project/projectActions";
import { getQueryNews } from "../../redux/slices/sliceNews/newsActions";
import { useEffect } from "react";


function SearchbarContent() {
  const { allPosts } = useSelector((state) => state.post);
  const { allUsers } = useSelector((state) => state.user);
  const { allProjects } = useSelector((state) => state.project);
  const { news } = useSelector((state) => state.newsSlice);
  const [params] = useSearchParams();
  const search = params.get("s")
  const com = params.get("c")
  const [inputSearch, setInputSearch] = useState(search);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputSearch(e.target.value)
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ s: e.target.value,c:com })}`,
    });
    dispatch(getQueryPost(allPosts,e.target.value))
    dispatch(getQueryUser(allUsers,e.target.value))
    dispatch(getQueryProjects(allProjects,e.target.value))
    dispatch(getQueryNews(news,e.target.value))
  };

  useEffect(()=>{
    setInputSearch(search)
  },[search])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const clearInputSearch = (e) => {
    e.preventDefault();
    setInputSearch("");
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ s: "",c:com })}`,
      
    });
    dispatch(getQueryPost(allPosts,e.target.value))
    dispatch(getQueryUser(allUsers,e.target.value))
    dispatch(getQueryProjects(allProjects,e.target.value))
    dispatch(getQueryNews(news,e.target.value))
  };

  return (
    <div className="w-full p-2">
      <form onSubmit={handleSubmit} className="w-full flex flex-row justify-between items-center">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 pl-3 items-center pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" id="default-search" className="block border-b-2 border-gray-300 px-4 py-2 pl-10 w-full text-base text-gray-900 focus:outline-none focus:border-gray-700 pr-8" placeholder="Search Posts, Users..."  onChange={handleChange} value={inputSearch}/>
 
          <span title="Search clean" className="absolute right-2.5 bottom-2.5 text-gray-500 cursor-pointer">
            {inputSearch && <FontAwesomeIcon onClick={clearInputSearch} icon={faXmark} />}
          </span> 
        </div>
      </form>
    </div>
  );
}

export default SearchbarContent;