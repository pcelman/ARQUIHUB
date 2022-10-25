import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getQueryPost } from "../../../../redux/slices/post/ordenAndFilterActions";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  getAllUsers,
  getQueryUser,
} from "../../../../redux/slices/user/userActions";
// import { getAllProjects, getQueryProjects } from "../../../../redux/slices/project/projectActions";
import { getAllProjects } from "../../../../redux/slices/project/projectActions";
import { getQueryProjects } from "../../../../redux/slices/project/projectActions";
import { getAllPosts } from "../../../../redux/slices/post/postActions";
import { getQueryNews } from "../../../../redux/slices/sliceNews/newsActions";

function SearchCelu() {
  const [inputSearch, setInputSearch] = useState("");
  const { allPosts } = useSelector((state) => state.post);
  const { allUsers } = useSelector((state) => state.user);
  const { allProjects } = useSelector((state) => state.project);
  const { news } = useSelector((state) => state.newsSlice);
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  useEffect(() => {
    /*     dispatch(getAllPosts())
    dispatch(getAllUsers()) */
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputSearch("");
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ s: inputSearch, c: "all" })}`,
    });
    /* setParams({
      s: inputSearch
    }) */
    dispatch(getQueryPost(allPosts, inputSearch));
    dispatch(getQueryUser(allUsers, inputSearch));
    dispatch(getQueryProjects(allProjects, inputSearch));
    dispatch(getQueryNews(news, inputSearch));
  };

  const clearInputSearch = (e) => {
    e.preventDefault();
    setInputSearch("");
    dispatch(getQueryPost(allPosts, ""));
  };

  return (
    <div className="">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex text-sm ">
          <div className="flex items-center w-full">
            <input
              className="w-full p-2 border-b-2 bg-transparent placeholder-gray-400 border-gray-400 duration-700 text-base text-gray-400  focus:outline-none
                "
              type="text"
              placeholder="Search..."
              value={inputSearch}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span
              title="Search clean"
              className="text-gray-300 cursor-pointer"
            >
              {inputSearch && (
                <FontAwesomeIcon onClick={clearInputSearch} icon={faXmark}  className="-ml-14"/>
              )}
            </span>
            <FontAwesomeIcon
              onClick={handleSubmit}
              cursor="pointer"
              className="-ml-8 text-base text-gray-300"
              icon={faMagnifyingGlass}
            />
          </div>
          {/* <div
            onClick={handleSubmit}
            className="w-12 md:w-16 bg-gray-100 text-center text-gray-50 cursor-pointer shadow-lg hover:bg-gray-200 flex justify-center items-center"
          >
            <button>
              <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
            </button>
          </div> */}
        </div>
      </form>
      {/* <div>
        {inputSearch.length ? <div className="w-full flex justify-center py-2"><p className="text-">{`Results for "${inputSearch}"`}</p></div> : <></>}
      </div> */}
    </div>
  );
}

export default SearchCelu;
