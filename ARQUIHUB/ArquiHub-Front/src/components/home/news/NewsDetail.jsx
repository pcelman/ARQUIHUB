import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNews1 } from "../../../redux/slices/sliceNews/newsActions";
import { Link } from "react-router-dom";

export default function NewsDetail(props) {
  const newNews = useSelector((state) => state.newsSlice.news);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews1());
  }, [dispatch]);

  const detail = newNews.length > 0 && newNews.filter((e) => e.id == params.id);

  function handleLink() {
    // window.location.href = detail[0].url
    window.open(detail[0].url, "_blank");
  }

  return (
    <div>
      <div>
        <div className="container mx-40 mt-6">
          <img
            src={detail.length > 0 && detail[0].image}
            width="600px"
            alt="news"
          />
          <div className="text-gray-400 mt-6">
            {detail.length > 0 && detail[0].date}
          </div>
          <p className="font-semibold text-transform: uppercase">
            {detail.length > 0 && detail[0].title}
          </p>
          <div className="font-light max-w-prose">
            {detail.length > 0 && detail[0].description}
          </div>

          <div
            onClick={handleLink}
            className="font-light max-w-prose underline decoration-solid text-sky-600 color: rgb(3 105 161); mb-6"
          >
            read original post
          </div>
        </div>
      </div>
    </div>
  );
}