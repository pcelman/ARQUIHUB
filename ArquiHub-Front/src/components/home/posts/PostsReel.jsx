import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/slices/post/postActions";
import { orderPosts } from "../../../redux/slices/post/ordenAndFilterActions";

export default function PostsReel() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.orderPosts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const indexLastCard = 3 * page;
  const postSort = [...posts]
  const currentCards = postSort.reverse().slice(0, indexLastCard)
  const date = new Date()
  const today = date.getDate()
  const month = date.getMonth() + 1

  function paginado() {
    setPage(page + 1);
  }

  return (
    <div>
      <h4 className="mb-6 font-semibold ">Latest posts created at {today}/{month}</h4>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
          {currentCards.length > 0 ? (
            currentCards.map((post, i) => {
              return (
                <div key={i}>
                  <Link to={`/postDetail/${post._id}`}>
                    <img
                      width="600px"
                      src={post.image[0]}
                      alt="foto"
                      className="w-full aspect-[3/2]"
                    />
                    <h4 className="font-bold text-transform: uppercase mt-6">
                      {post.title}
                    </h4>
                    <p className=" font-light truncate">{post.description}...</p>
                  </Link >
                </div>
              );
            })
          ) : ( 
            <></>
          )}
        </div>
        {currentCards.length === 0 
          ? <div className="w-full flex justify-center items-center h-32"><p className="text-xl font-medium text-gray-500">No posts found!</p></div> 
          : <></>}
        {posts.length !== currentCards.length && <div
          className="mr-8 text-xl my-9 font-semibold flex flex-row-reverse cursor-pointer"
          onClick={(e) => paginado(e)}
        >
          See more...
        </div>}
      </div>
    </div>
);
}