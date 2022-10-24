import React from "react";

function CarouselLandingPageData({ arch, quotes, description, img, buildingName }) {
  return (
    <div className="flex flex-row w-full mt-8">
      <div className="w-5/12 flex flex-col justify-center ">
        <p className="text-gray-700 2xl:leading-tight
        2xl:text-5xl 2xl:w-2/3
        xl:text-3xl xl:w-3/4 xl:pr-16 xl:mb-28"
        >
          {quotes}
          <span className=" block w-full text-end pt-4 text-2xl font-bold text-gray-800
          xl:text-xl ">
          {arch}
        </span>
        </p>
        
      </div>
      <div className="w-7/12 ml-auto">
        <img
          className="w-full"
          src={img}
          alt={`${buildingName}`}
        />
        <p className="m-auto py-2 text-xl 
        xl:text-lg xl:text-center xl:text-gray-800">
          <span className="font-bold">{buildingName}</span>
          {description}
        </p>
      </div>
    </div>
  );
}

export default CarouselLandingPageData;
