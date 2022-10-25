import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { getQueryPost } from "../../redux/slices/post/ordenAndFilterActions";
import { getAllPosts } from "../../redux/slices/post/postActions";
import {
  getAllProjects,
  getQueryProjects,
} from "../../redux/slices/project/projectActions";
import {
  getNews1,
  getQueryNews,
} from "../../redux/slices/sliceNews/newsActions";
import { getAllUsers, getQueryUser } from "../../redux/slices/user/userActions";
import { queryUser } from "../../redux/slices/user/userSlice";
import SearchAll from "./SearchAll";
import SearchbarContent from "./SearchbarContent";
import SearchNews from "./SearchNews";
import SearchPost from "./SearchPost";
import SearchProjects from "./SearchProjects";
import SearchUsers from "./SearchUsers";
import Loader from "../loader/Loader"
function SearchContent() {
  const [params] = useSearchParams();
  const { allPosts, queryPost } = useSelector((state) => state.post);
  const { allUsers, queryUsers } = useSelector((state) => state.user);
  const { allProjects, queryProjects } = useSelector((state) => state.project);
  const { news, queryNews } = useSelector((state) => state.newsSlice);
  const search = params.get("s") || "";
  const com = params.get("c")
  const [components, setComponents] = useState({
    all : (com === "all" && true),
    posts : com === "posts" && true,
    news : com === "news" && true,
    projects : com === "projects" && true,
    users : com === "users" && true,
  });

  const handleClick = (e) =>{
    e.preventDefault()
    setComponents({[e.target.id] : true})
  }
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    if (!allPosts.length) dispatch(getAllPosts())
    if (queryPost.length && allPosts.length !== 0) dispatch(getQueryPost(allPosts, search))

    if (!allUsers.length) dispatch(getAllUsers());
    if (queryUsers.length && allUsers.length !== 0) dispatch(getQueryUser(allUsers, search));

    if (!allProjects.length) dispatch(getAllProjects());
    if (queryProjects.length && allProjects.length !== 0) dispatch(getQueryProjects(allProjects, search));

    if (!news.length) dispatch(getNews1());
    if (queryNews.length && news.length !== 0) dispatch(getQueryNews(news, search));
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ 
        s: search,
        c:(components.all && "all") || 
          (components.posts && "posts") || 
          (components.news && "news") || 
          (components.projects && "projects") || 
          (components.users && "users")
        })}`,
    });
  }, [dispatch, allPosts, allUsers, allProjects, news,components]);

  const results = () => {
    if(allPosts.length && allProjects.length && allUsers.length && news.length ){
      const allResults =  queryPost.length + queryUsers.length + queryNews.length + queryProjects.length
      return allResults
    }
    return false
  }

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 flex flex-col gap-8 pb-8">
      <div className="flex flex-col">
      <SearchbarContent/>
        {search.length ? <p className="text-sm font-medium text-gray-600">SEARCH RESULTS FOR "<span className="font-semibold">{params.get("s")}</span>"</p>:<></>}
        {/* <div className="border border-gray-500"></div>
        <p className="text-gray-500">{results()===false ? "Loading": results()} results</p> */}
      </div>
      <div className="flex justify-between border-b-2 border-gray-700 w-full overflow-hidden overflow-x-auto">
        <div onClick={handleClick} className={`text-center cursor-pointer mr-4 w-1/3 rounded-t-md ${components.all && "bg-gray-700 text-gray-50"}`}>
          <p id="all" className="px-4 text-lg  lg:py-0.5">All <span id="all" className="hidden lg:inline">({results()})</span></p>
        </div>
        <div onClick={handleClick} className={`text-center cursor-pointer mx-4 w-1/3 rounded-t-md ${components.posts && "bg-gray-700 text-gray-50"}`}>
          <p id="posts" className="px-4 text-lg lg:py-0.5">Posts <span id="posts" className="hidden lg:inline">({queryPost.length})</span></p>
        </div>
        <div onClick={handleClick} className={`text-center cursor-pointer mx-4 w-1/3 rounded-t-md ${components.projects && "bg-gray-700 text-gray-50"}`}>
          <p id="projects" className="px-4 text-lg lg:py-0.5">Projects <span id="projects" className="hidden lg:inline">({queryProjects.length})</span></p>
        </div>
        <div onClick={handleClick} className={`text-center cursor-pointer mx-4 w-1/3 rounded-t-md ${components.news && "bg-gray-700 text-gray-50"}`}>
          <p id="news" className="px-4 text-lg lg:py-0.5">News <span id="news" className="hidden lg:inline">({queryNews.length})</span></p>
        </div>
        <div onClick={handleClick} className={`text-center cursor-pointer ml-4 w-1/3 rounded-t-md ${components.users && "bg-gray-700 text-gray-50"}`}>
          <p id="users" className="px-4 text-lg lg:py-0.5">Users <span id="users" className="hidden lg:inline">({queryUsers.length})</span></p>
        </div>
      </div>
      <div className="">
      {!allPosts.length || !allProjects.length || !allUsers.length || !news.length 
      ? <div className="w-full flex justify-center h-48 items-center"><Loader/></div> 
      : <div>
      {components.all && <SearchAll/>}
      {components.posts && <SearchPost posts={queryPost} allPosts={allPosts}/>}
      {components.projects && <SearchProjects projects={queryProjects}/>}
      {components.news && <SearchNews news={queryNews}/>}
      {components.users && <SearchUsers users={queryUsers}/>}
      </div>}
      </div>
    </div>
  );
}

export default SearchContent;
