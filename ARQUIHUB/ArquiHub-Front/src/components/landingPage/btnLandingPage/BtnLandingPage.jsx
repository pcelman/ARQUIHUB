import React from "react";
import { Link } from "react-router-dom";

function BtnLandingPage() {
  return (
    <div className="mx-32 fixed bottom-8">
      <Link to="/home">
      <button className="bg-gray-200  mt-12 py-4 px-8 rounded-xl hover:bg-opacity-50 flex items-center group ">
        <span className="tracking-widest xl:text-2xl pr-8 uppercase transition-all duration-300 ease-linear group-active:scale-90">
          Start now
        </span>
        <svg
          className="-translate-x-2 transition-all duration-300 ease-linear group-hover:translate-x-0 group-active:scale-90"
          viewBox="0 0 46 16"
          height="20"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
          id="arrow-horizontal"
        >
          <path
            transform="translate(30)"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            data-name="Path 10"
            id="Path_10"
          ></path>
        </svg>
      </button>
      </Link>
    </div>
  );
}

export default BtnLandingPage;
