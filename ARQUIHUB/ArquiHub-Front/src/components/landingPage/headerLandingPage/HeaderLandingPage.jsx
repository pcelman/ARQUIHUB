import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../header/logo/Logo";

function HeaderLandingPage() {
  return (
    <div className="select-none">
      <div className="border-b-2 border-gray-200">
        <div className="flex justify-between m-4 items-center h-14
        md:mx-8
        lg:mx-16 lg:h-16
        xl:mx-32
        ">
          <div className="text-3xl">
            <Logo/>
          </div>
        <div className="inline">
          <Link to="/home">
          <button className="text-xl border-r-4 py-1 px-4 border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-500 ">
            Start now
          </button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}


export default HeaderLandingPage;
