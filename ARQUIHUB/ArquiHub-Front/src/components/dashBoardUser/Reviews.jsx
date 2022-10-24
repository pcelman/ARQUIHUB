import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Reviews({ id }) {
  const user = useSelector((state) => state.user.viewUser);
  /*   const allReviews = useSelector((state) => state.review.allReviews);
  let userReviews = allReviews.filter((rev) => rev.user._id == id); */
  /*   let userReviews = user.reviews
  userReviews = userReviews.length && userReviews.map((rev) => {
    return {
      postId: rev.post_id,
      title: rev.post[0].title,
      comment: rev.comment,
      createdAt: rev.createdAt, 
      image: rev.post[0].image[0],
    };
  }); */
  const [state, setState] = useState(user.reviews);
  const [cambio, setCambio] = useState(false);

  useEffect(() => {
    setState(state);
  }, [cambio]);

  function handleSearch(e) {
    e.preventDefault();
    const reviewSearch = user.reviews.filter((review) =>
      review.post_id.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    reviewSearch.length ? setState(reviewSearch) : setState("not found");
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
      {user.length !== 0 && user.reviews.length ? (
        <div className="flex flex-col lg:flex-row justify-between gap-4 my-6">
          {/* <label>Search post... </label> */}
          <div className="flex flex-row items-center w-full relative">
            <input
              className="border lg:px-2 border-slate-200 p-1 w-full lg:w-3/4 shadow-sm placeholder:slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Search reviews..."
              onChange={(e) => handleSearch(e)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-0 pr-4 lg:pr-32 text-gray-400"
            />
          </div>
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
        {state === "not found" ? (
          <div>
            <p>there are no matches with your search</p>
          </div>
        ) : user.reviews.length ? (
          state.length &&
          state.map((rev) => {
            // <div className="flex flex-col-3">

            return (
              <div className="w-full">
                {rev.post_id && (
                  <Link to={`/postDetail/${rev.post_id._id}`} className="w-full">
                    <div className="">
                      <div className="">
                        <img src={rev.post_id.image[0]} className="w-full object-cover h-[42vw] lg:h-[16vw] 2xl:h-[12vw]"/>
                        <div>
                          <div className="text-base font-semibold mt-6">
                            {rev.post_id.title}
                          </div>
                          <p className="text-base  text-slate-300">
                            {rev.createdAt.slice(0, 10)}
                          </p>
                          <p className="text-base ">{rev.comment}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
            // </div>
          })
        ) : (
          <div>
            <p>you don't have any reviews</p>
          </div>
        )}
      </div>
    </div>
  );
}
