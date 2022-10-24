import React from "react";
import news from "../../../api/news";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getNews1 } from "../../../redux/slices/sliceNews/newsActions";

export default function NewsReel() {
  const dispatch = useDispatch();
  const newNews = useSelector((state) => state.newsSlice);

  useEffect(() => {
    dispatch(getNews1());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const indexLastCard = 3 * page;
  const newsPaginado = newNews.news.slice(0, indexLastCard);
  function paginado() {
    setPage(page + 1);
  }
  return (
    <div>
      <h4 className="mb-6 font-semibold font-size:26px">News</h4>
      <div className="container mx-auto margin-top: 16px">
        <Link to={newsPaginado.length !== 0 && `/newsDetail/${newsPaginado[0].id}`}>
          <div className="hidden my-8 lg:flex">
            {newsPaginado.length !== 0 && (
              <div className="flex flex-row items-center">
                <img src={newsPaginado[0].image} alt="" className="w-4/6" />
                <div className="flex justify-between flex-col mx-4 gap-2">
                  <div className="">
                    <div className="text-2xl font-medium">{newsPaginado[0].title}</div>
                    <div className="my-2 italic text-gray-400">{newsPaginado[0].date}</div>
                  </div>
                  <div className="">
                    {newsPaginado[0].description}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
          {newsPaginado.map((e, index) => (
            <Link key={index} to={`/newsDetail/${e.id}`}>
              <div>
                {e.id === 0 ? (
                  <img
                    src="https://res.cloudinary.com/do3dbemlj/image/upload/v1664405309/news/Screen_Shot_2022-09-28_at_19.44.45_zocf1r.png"
                    className="w-full aspect-[3/2]"
                    alt=""
                  />
                ) : (
                  <img
                    src={e.image}
                    width="600px"
                    alt="news"
                    className="w-full aspect-[3/2]"
                  />
                )}
                <div className="text-gray-400 mt-6">{e.date}</div>
                <p className="font-semibold truncate text-transform: uppercase ">
                  {e.title}
                </p>
                <div className="font-light truncate">{e.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="mr-8 text-xl my-9 font-semibold flex flex-row-reverse cursor-pointer"
        onClick={(e) => paginado(e)}
      >
        See more...
      </div>
    </div>
  );
}
