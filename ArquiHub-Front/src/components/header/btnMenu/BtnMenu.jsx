import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faChevronUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeShowMenu } from "../../../redux/slices/header/headerActions";
import Hamburger from 'hamburger-react'
import { createSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import { showSigIn, showSignUp } from "../../../redux/slices/header/headerSlice";

function BtnMenu() {
  const [isOpen, setOpen] = useState(false)
  const { modalSignIn, modalSignUp } = useSelector((state) => state.header);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const closeMenu = (e) => {
    e.preventDefault()
    setOpen(false)
  }

  const handleNavigate = (value) => {
    /* navigate("/home") */
    navigate("/search?s=&c="+value)
    /* window.location.reload() */
  }

  const handleNavigateHome = () => {
    navigate("/home")
  }

  const toggleSignIn = (e) => {
    e.preventDefault();
    dispatch(showSigIn(!modalSignIn));
  };
  const toggleSignUp = (e) => {
    e.preventDefault();
    dispatch(showSignUp(!modalSignUp));
  };
  return (
    <div className="">
      <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
      {isOpen && <div onClick={closeMenu} className="fixed left-0 top-14 w-screen h-screen bg-black opacity-50"></div>}
      <div className={` right-0 top-14 fixed bg-gray-100 w-11/12 h-full ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500
      sm:w-1/2
      md:w-[45vw]
      lg:w-[35vw]
      xl:w-[30vw]
      2xl:w-[20vw]
      `}
      >
        <div className="w-full h-[90vh] flex flex-col pt-4 gap-16 justify-between">
          <div className="text-gray-700 text-xl flex flex-col gap-4 items-center">
            <Link onClick={(e)=>[closeMenu(e),handleNavigateHome()]}><p>Home</p></Link>
            <Link onClick={(e)=>[closeMenu(e),handleNavigate("posts")]}><p>Posts</p></Link>
            <Link onClick={(e)=>[closeMenu(e),handleNavigate("news")]}><p>News</p></Link>
          </div>
          <div className="w-full text-gray-50 px-2 flex flex-col gap-4 text-lg">
            <button onClick={(e)=>[toggleSignIn(e),setOpen(false)]} className="bg-gray-600 py-2">Sing In</button>
            <button onClick={(e)=>[toggleSignUp(e),closeMenu(e)]} className="bg-gray-800 py-2">Sing Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BtnMenu;
