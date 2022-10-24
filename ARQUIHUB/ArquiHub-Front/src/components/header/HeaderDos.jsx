import React from "react";
import Logo from "./logo/Logo";
import GuestWhite from "./guest/GuestWhite";
import Menu from "./menu/Menu";
import { useSelector } from "react-redux";
import Logged from "./logged/Logged";
import { useLocation } from "react-router-dom";
import BtnMenu from "./btnMenu/BtnMenu";
import Navbar from "./navbar/Navbar";
import { useEffect } from "react";
import { useRef } from "react";
import NavBarDos from "./navbar/NavBarDos";
import LoggedWhite from "./logged/LoggedWhite";



const HeaderDos = () => {
  const { pathname } = useLocation();
  const token = window.localStorage.getItem("token");
  const googleUser = window.localStorage.getItem("googleUser");
  const { user } = useSelector((state) => state.login);
  const isLoggin =
    token !== null && token !== "null"
      ? true
      : false || googleUser
      ? true
      : false || user.token
      ? true
      : false;
  const condition = useRef(isLoggin);
  function scroll() {
  }

  useEffect(() => {
    condition.current = isLoggin;
  }, [isLoggin]);

  const { menu } = useSelector((state) => state.header);
  return (
    <div>
      <div className="fixed bg-opacity-0 bg-gradient-to-b from-gray-800 w-full top-0 z-10">
        <div
          className="flex justify-between items-center h-16 mx-4
    md:mx-8
    lg:mx-16 lg:h-16
    xl:mx-32 xl:h-20
    2xl:mx-64 2xl:h-24
    "
        >
          <div className="flex items-center gap-8 xl:gap-16 2xl:gap-32 w-7/12 2xl:w-8/12 ">
            <div className="text-2xl lg:text-3xl text-white">
              <Logo />
            </div>
            <div className="hidden lg:inline w-full">
              <NavBarDos path={pathname} />
            </div>
          </div>
          <div className=" xl:hidden">{token ? <LoggedWhite /> : <BtnMenu />}</div>
          <div className="hidden xl:flex gap-8 items-center pt-1">
            {condition.current ? <LoggedWhite /> : <GuestWhite />}
          </div>
        </div>
        {/* <div className="bg-gray-100 bg-opacity-50 lg:hidden">
          {menu && <Menu path={pathname} />}
        </div> */}
      </div>
    </div>
  );
};

export default HeaderDos;
