import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeShowMenu } from "../../../redux/slices/header/headerActions";
import {
  showSigIn,
  showSignUp,
} from "../../../redux/slices/header/headerSlice";

function Menu({ path }) {
  const { modalSignIn, modalSignUp } = useSelector((state) => state.header);
  const { menu } = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem("token"))

  const handleClick = (e,id) => {
    e.preventDefault()
    closeMenu(e)
    const anchor = document.querySelector(id);
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const closeMenu = (e, id) => {
    e.preventDefault();
    dispatch(changeShowMenu(!menu));
  };

  const toggleSignIn = (e) => {
    e.preventDefault();
    dispatch(showSigIn(!modalSignIn));
  };
  const toggleSignUp = (e) => {
    e.preventDefault();
    dispatch(showSignUp(!modalSignUp));
  };
  return (
    <div
      className="mx-4 h-screen
    md:mx-8
    lg:mx-16
    xl:mx-32
    "
    >
      <div className="flex flex-col justify-between">
        <div className="menu-div h-96">
          <div className="menu h-4/5">
            <div onClick={(e) => handleClick(e, "#home_id")}>
              <Link className="menu-link-mobile" to="/home">
                Home
              </Link>
            </div>
            <div
              className="menu-div-link "
              onClick={(e) => handleClick(e, "#posts_id")}
            >
              <Link to="/home" className="menu-link-mobile">
                Posts
              </Link>
            </div>
            <div
              className="menu-div-link"
              onClick={(e) => handleClick(e, "#news_id")}
            >
              <Link to="/home" className="menu-link-mobile">
                News
              </Link>
            </div>
            {
              userLogin &&
              userLogin.userType === "superadmin" &&
            <div className="menu-div-link" onClick={(e) => handleClick(e,"#news_id")}>
               <Link
                 to="/admin"
                 
                 className="menu-link"
               >
                 Admin
               </Link>
            </div>
            }
            <div className="menu-div-link" onClick={closeMenu}>
              <Link to="/about-us" className="menu-link-mobile"/>
              <Link  to="/createpost" className="menu-link">
                Create post
              </Link>
            </div>
            <div className="menu-div-link" onClick={closeMenu}>
              <Link  to="/dashuser" className="menu-link">
                User Dashboard
              </Link>
            </div>
             {/* <div className="menu-div-link" onClick={closeMenu}>
              <Link to="/about-us" className="menu-link">
                About us
              </Link>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col text-gray-50 w-full sm:items-center sm:gap-4">
          <button
            onClick={toggleSignIn}
            className="bg-gray-600 py-2 mb-4 sm:w-1/2"
          >
            Sign in
          </button>
          <button
            onClick={toggleSignUp}
            className="bg-gray-800 py-2 mb-4 sm:w-1/2"
          >
            Sign up
          </button>
        </div>
        <div className="div-icon">
          <a
            href="https://github.com/Frann24/ArchiHub-Front"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <FontAwesomeIcon className="icon" icon={faGithub} />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FontAwesomeIcon className="icon" icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
