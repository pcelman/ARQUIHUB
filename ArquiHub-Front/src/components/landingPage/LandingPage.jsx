import React from "react";
import BtnLandingPage from "./btnLandingPage/BtnLandingPage";
import CarouselLandingPage from "./carousel/CarouselLandingPage";
import HeaderLandingPage from "./headerLandingPage/HeaderLandingPage";

function LandingPage() {
  return (
    <div className="font-raleway h-full static">
      <HeaderLandingPage />
      <CarouselLandingPage />
      <BtnLandingPage />
    </div>
  );
}

export default LandingPage;
