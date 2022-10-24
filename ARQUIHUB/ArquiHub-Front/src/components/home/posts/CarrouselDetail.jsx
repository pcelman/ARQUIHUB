import React from "react";
import { useState } from "react";
import styled from "styled-components";
// import "../Carrousel-slider/Carrousel.css";
import { useSelector } from "react-redux";

const CarrouselImg = styled.img`
  max-width: 500px;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: 1s;
  &.loaded {
    opacity: 1;
  }
`;

const CarrouselDetail = () => {
  const postDetail = useSelector((state) => state.post.post);
  const images = postDetail.image;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };
  const next = () => {
    selectNewImage(selectedIndex, images);
  };

  return (
    <div className="container  flex mx-30  mt-6 mb-20">
      <div className="">
        <button className="px-6  top-96 left-72 " onClick={previous}>
          {"<"}
        </button>
        <CarrouselImg
          src={selectedImage}
          alt="AH"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
        <button onClick={next} className="px-6  top-96 right-72">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CarrouselDetail;
