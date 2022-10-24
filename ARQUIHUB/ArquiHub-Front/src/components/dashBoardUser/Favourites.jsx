import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/slices/user/userActions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Favourites() {
  /*   const dispatch = useDispatch(); */
  /*   const userLogeado = JSON.parse(localStorage.getItem("token"));
   */
  /*   useEffect(() => {
    dispatch(getUser(userLogeado.userId));
  }, [dispatch]); */
  const user = useSelector((state) => state.user.viewUser);
  let postsFav = user.favourites;

  postsFav = postsFav.map((post) => {
    return {
      id: post._id,
      title: post.title.toUpperCase(),
      createdAt: post.createdAt,
      image: post.image,
    };
  });
  const [state, setState] = useState(postsFav);
  const [cambio, setCambio] = useState(true);

  useEffect(() => {
    console.log(postsFav);
  }, [cambio]);

  function handleSearch(e) {
    e.preventDefault();
    const postsSearch = postsFav.filter((posts) =>
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
      {postsFav.length ? (
        <div className="flex flex-col lg:flex-row justify-between gap-4 my-6">
          {/* <label>Search post... </label> */}
          <input
            className="border border-slate-200 rounded-md shadow-sm placeholder:slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="text"
            placeholder="Search post..."
            onChange={(e) => handleSearch(e)}
          />
          <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-0 pr-4 lg:pr-32 text-gray-400"
            />
          <button
            className="bg-slate-300  px-3 py-1 text-slate-900"
            onClick={(e) => handleOrderDate(e)}
          >
            order DATE
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex flex-col w-full lg:flex-row gap-6 justify-between my-6">
        {
          // state === "not found" ? (
          //   <div>
          //     <p>there are no matches with your search</p>
          //   </div>
          // ) :

          postsFav.length ? (
            state.length &&
            state.map((post) => {
              return (
                <div className="w-full">
                  <Link to={`/postDetail/${post.id}`} className="w-full">
                    <div className="">
                      <img src={post.image[0]} className="w-full object-cover h-[42vw] lg:h-[16vw] 2xl:h-[12vw]"></img>
                      <div className="text-base font-semibold mt-6">
                        <h3>{post.title}</h3>
                        <p>{post.createdAt.slice(0, 10)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div>
              <p>you don't have any saved post</p>
            </div>
          )
        }
      </div>
    </div>
  );
}
