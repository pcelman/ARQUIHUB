import React from "react";
import news from "../../../api/news";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getNews1 } from "../../../redux/slices/sliceNews/newsActions";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect } from "react";

export default function NewsReel() {
  const dispatch = useDispatch();
  const newNews = useSelector((state) => state.newsSlice.news);

  useEffect(() => {
    dispatch(getNews1());
  }, [dispatch]);

  const carouselNews = [];

  let quantity = newNews.length;

  for (let i = 0; i < newNews.length; i++) {
    if (carouselNews.length < quantity) {
      carouselNews.push(newNews[i]);
    }
  }

  return (
    <div>
      <h4 id="news_id" className="ml-6 mb-6 font-semibold font-size:26px">News</h4>
      <div className="container mx-auto margin-top: 16px">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
          {/* {newsPaginado.map((e,index) => (
            <Link key={index} to={`/newsDetail/${e.id}`}>
              <div>
                {e.id === 2 ? (
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
                <div className="font-light truncate" >{e.description}</div>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
      
      <div
        className="mr-8 text-xl my-9 font-semibold flex flex-row-reverse cursor-pointer"
        /* onClick={(e) => paginado(e)} */
      >
      {/* <div className="ml-6 mb-6 font-semibold bg-orange-400">News</div> */}
    <div className="container mx-auto mb-20 gap-6">
      <div className="container mx-auto margin-top: 16px gap-6">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider
          className="lg:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={quantity}
          visibleSlides={3}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="bottom-16 absolute z-30 left-0 ml-8  focus:outline-indigo-200 focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={2} />
              </svg>
            </ButtonBack>
            <div className=" w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselNews.map((e, index) => {
                    return (
                      <Slide key={e._id}>
                        <div>
                          <Link key={index} to={`/newsDetail/${e.id}`}>
                            <img
                              className="w-full aspect-[3/2] px-6 "
                              src={e.image}
                              alt="img not found"
                            />
                          </Link>

                          <div>
                            <h2 className="text-gray-400 mt-5 px-6">
                              {e.date}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <div className="font-semibold truncate text-transform: uppercase px-6">
                                {e.title}
                              </div>
                              <div className="font-light truncate  px-6">
                                {e.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="bottom-16 absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for desktop and MEDIUM size devices */}
        <CarouselProvider
          className="lg:hidden md:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={quantity}
          visibleSlides={3}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="bottom-20 absolute z-30 left-0 ml-8  focus:outline-indigo-200 focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselNews.map((e, index) => {
                    return (
                      <Slide key={e._id}>
                        <div>
                          <Link key={index} to={`/newsDetail/${e.id}`}>
                            <img
                              className="w-full aspect-[3/2] px-6 "
                              src={e.image}
                              alt="img not found"
                            />
                          </Link>

                          <div>
                            <h2 className="text-gray-400 mt-6 px-6">
                              {e.date}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <div className="font-semibold truncate text-transform: uppercase px-6">
                                {e.title}
                              </div>
                              <div className="font-light truncate  px-6">
                                {e.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="bottom-20 absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for desktop and SMALL size devices */}
        <CarouselProvider
          className="block md:hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={quantity}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8  focus:outline-indigo-200 focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div>
                  {carouselNews.map((e, index) => {
                    return (
                      <Slide key={e._id}>
                        <div>
                          <Link key={index} to={`/newsDetail/${e.id}`}>
                            <img
                              className="w-full aspect-[3/2] px-6 "
                              src={e.image}
                              alt="img not found"
                            />
                          </Link>

                          <div>
                            <h2 className="text-gray-400 mt-6 px-6">
                              {e.date}
                            </h2>
                            <div style={{ marginTop: 40 }}>
                              <div className="font-semibold truncate text-transform: uppercase px-6">
                                {e.title}
                              </div>
                              <div className="font-light truncate  px-6">
                                {e.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    );
                  })}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
    </div>
    </div>
  );
}
