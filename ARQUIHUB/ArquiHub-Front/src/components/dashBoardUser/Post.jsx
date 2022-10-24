import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Post({ id }) {
  /*   let allPosts = useSelector((state) => state.post.allPosts);
  let postsUser = allPosts.filter((posts) => posts.created_by == id); */
  const userLogeado = JSON.parse(localStorage.getItem("token"));
  const user = useSelector((state) => state.user.viewUser);
  /*   postsUser = postsUser.map((post) => {
    return {
      id: post._id,
      title: post.title.toUpperCase(),
      description: post.description,
      createdAt: post.createdAt,
      image: post.image[0],
    };
  }); */

  const [state, setState] = useState(user.posts);
  const [cambio, setCambio] = useState(false);

  useEffect(() => {
    console.log(cambio);
  }, [cambio]);

  function handleSearch(e) {
    e.preventDefault();
    const postsSearch = user.posts.filter((posts) =>
      posts.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    postsSearch.length ? setState(postsSearch) : setState("not found");
  }

  function handleOrderDate(e) {
    if (cambio == true) {
      const order = state.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });
      setCambio(false);
      setState(order);
      return;
    }
    if (cambio == false) {
      const order = state.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
      setCambio(true);
      setState(order);
      return;
    }
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col w-full lg:flex-row gap-4 justify-between items-end my-6">
          {/* <label className="text-base">Search post... </label> */}
          <div className="flex flex-row items-center w-full relative">
            <input
              className="border lg:px-2 border-slate-200 p-1 w-full lg:w-3/4 shadow-sm placeholder:slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="text"
              placeholder="Search post..."
              onChange={(e) => handleSearch(e)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-0 pr-4 lg:pr-32 text-gray-400"/>
          </div>
          <div className="flex flex-row w-full">
            <button onClick={(e) => handleOrderDate(e)} className="mr-4 bg-gray-300 px-4">
              Date
            </button>
           { user.length!==0 && userLogeado && userLogeado.userId==user._id ?<Link to={"/createpost"} className="w-1/2">
              <button className="bg-green-600 text-white px-6">New</button>
            </Link>:<></>}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="">
        {state === "not found" ? (
          <div className="">
            <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
              <p className="text-slate-500 text-base ml-12">
                there are no matches with your search
              </p>
            </div>
          </div>
        ) : state.length ? (
          <div className="flex flex-col w-full gap-6 justify-between my-6 lg:flex-row">
            {user.length !== 0 &&
              state.map((post) => {
                return (
                  <Link to={`/postDetail/${post._id}`} className="w-full">
                    <div className="">
                      {post.image.length ? (
                        <img src={post.image[0]} className="w-full object-cover h-[42vw] lg:h-[16vw] 2xl:h-[12vw]"/>
                      ) : (
                        <img
                          src="https://res.cloudinary.com/dfcd64nhm/image/upload/v1664674482/Arquihub/4e36ead625b16bac653d2b07c7a57005_if3usp.png"
                          width="250px"
                        />
                      )}
                      <div>
                        <div className="text-slate-500 text-base mt-6">
                          {post.createdAt.slice(0, 10)}
                        </div>
                        <div className=" font-semibold text-base ">
                          {post.title.toUpperCase()}
                        </div>
                        <div className="text-slate-500 text-base ">
                          {post.description.slice(0, 70)}...
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        ) : (
          <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
            <p className="text-slate-500 text-base ml-12">
              You have no posts created
            </p>
            <Link to={"/createpost"}>
              <button className="bg-green-600 text-white px-6 mt-6">New</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
