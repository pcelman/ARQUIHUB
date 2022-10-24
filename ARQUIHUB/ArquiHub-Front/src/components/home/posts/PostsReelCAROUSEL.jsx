import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../redux/slices/post/postActions";
import { orderPosts } from "../../../redux/slices/post/ordenAndFilterActions";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function PostsReel() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.orderPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const carouselPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (carouselPosts.length < 15) {
      carouselPosts.push(posts[i]);
    }
  }
  let quantity= carouselPosts.length

console.log("posts.length: ", posts.length)
  return (
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
                {carouselPosts.map((e, index) => {
                  return (
                    <Slide key={e._id} 
                    className=" max-w-6 max-h-2">
                      <div 
                      >
                        <Link key={index} to={`/postDetail/${e._id}`}>
                        <img
                          className="w-full aspect-[1/4] px-6 "
                          //  className=" px-6 "
                          src={e.image[0]}
                          alt="img not found"

                          // style={{

                          //   minHeight: 180,
                          //   maxHeight: 180,
                          //   // width: "100%",
                          //   objectFit: "cover",
                          
                          // }}
                        />

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
                        </Link>
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
                {carouselPosts.map((e, index) => {
                  return (
                    <Slide key={e._id}>
                      <div>
                        <img
                          className="w-full aspect-[3/2] px-6 "
                          src={e.image[0]}
                          alt="img not found"
                        />
                            <Link key={index} to={`/postDetail/${e.id}`}>

                          
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
                        </Link>
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
                {carouselPosts.map((e, index) => {
                  return (
                    <Slide key={e._id}>
                      <div>
                        <img
                          className="w-full aspect-[3/2] px-6 "
                          src={e.image[0]}
                          alt="img not found"
                        />
                        <Link key={index} to={`/postDetail/${e.id}`}>

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
                        </Link>
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
);
}
