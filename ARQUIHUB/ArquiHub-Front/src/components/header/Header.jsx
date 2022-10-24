import React, { useState } from "react";
import Logo from "./logo/Logo";
import Guest from "./guest/Guest";
import Menu from "./menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import Logged from "./logged/Logged";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../home/Home";
import PostDetail from "../home/posts/PostDetail";
import CreatePost from "../createPost/CreatePost";
import NewsDetail from "../home/news/NewsDetail";
import BtnMenu from "./btnMenu/BtnMenu";
import Footer from "../footer/Footer";
import DashBoard from "../dashBoardAdmin/DashBoard";
import ProjectDetail from "../home/projects/ProjectDetail";
import Navbar from "./navbar/Navbar";
import { useEffect } from "react";
import { useRef } from "react";
import CreateProject from "../home/projects/forms/CreateProject";
import Payment from "../payment/payment";
import ForgotPassword from "../resetPassword/ForgotPassword";
import ResetPassword from "../resetPassword/ResetPassword";
import DashBoardUser from "../dashBoardUser/DashBoardUser";
import SearchContent from "../searchContent/SearchContent";
import CancelPayment from "../payment/CancelPayment";
import InviteProject from "../home/projects/InviteProject";
import NotFound from "../errors/NotFound"
import AboutUs from "../AboutUs";
import HeaderDos from "./HeaderDos";
import { useWindowWidth } from "@react-hook/window-size";
import Successful from "../payment/Successful";
import ErrorPayment from "../payment/ErrorPayment";
import CancelPaymentError from "../payment/CancelPaymentError";
import CancelPaymentOK from "../payment/CancelPaymentOK";
import SigIn from "../signIn/SigIn";
import SignUp from "../signUp/SignUp";
import Modal from "../modal/Modal";
import { changeShowSingIn, changeShowSingUp } from "../../redux/slices/header/headerActions";

function Header() {
  const { pathname } = useLocation();
  const {modalSignIn, modalSignUp} = useSelector(state => state.header)
  const token = window.localStorage.getItem("token");
  const googleUser = window.localStorage.getItem("googleUser");
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(0);
  const onlyWidth = useWindowWidth();
  const isLoggin =
    token !== null && token !== "null"
      ? true
      : false || googleUser
      ? true
      : false || user.token
      ? true
      : false;
  const condition = useRef(isLoggin);
  window.onscroll = function () {
    setScroll(window.scrollY);
  };
  let location = useLocation();

  useEffect(() => {
    condition.current = isLoggin;
  }, [isLoggin]);

  const toggleSignIn = (e) => {
    e.preventDefault()
    dispatch(changeShowSingIn(!modalSignIn))
  }
  const toggleSignUp = (e) => {
    e.preventDefault()
    dispatch(changeShowSingUp(!modalSignUp))
  }
  const { menu } = useSelector((state) => state.header);
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div className="w-full">
        {(scroll > 300 ||
          location.pathname !== "/home" ||
          onlyWidth < 1024) && (
          <div className={`sticky  bg-white shadow-lg w-full top-0 z-10`}>
            <div
              className="flex justify-between mx-4 items-center h-16
          md:mx-8
          lg:mx-16 lg:h-16
          xl:mx-32 xl:h-20
          2xl:mx-64 2xl:h-24
          "
            >
              <div className="w-full flex justify-between items-center ">
                <div className="flex items-center gap-8 xl:gap-16 2xl:gap-32 w-7/12 2xl:w-8/12 ">
                  <div className="text-2xl lg:text-3xl ">
                    <Logo />
                  </div>
                  <div className="hidden lg:inline w-full ">
                    <Navbar path={pathname} />
                  </div>
                </div>
              <div className=" xl:hidden">
                {condition.current ? <Logged /> : <BtnMenu />}
              </div>
              <div className="hidden xl:flex gap-8 items-center pt-1">
                {condition.current ? <Logged /> : <Guest />}
              </div>
            </div>
            {/* <div className="bg-gray-100 bg-opacity-50 lg:hidden">
              {menu && <Menu path={pathname} />}
            </div> */}
            </div>
          </div>
        )}
        {scroll <= 300 && location.pathname === "/home" && (
          <div className="hidden lg:flex">
            <HeaderDos />
          </div>
        )}
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="newsDetail/:id" element={<NewsDetail />} />
          <Route path="postDetail/:id" element={<PostDetail />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="createproject" element={<CreateProject />} />
          <Route path="/admin" element={<DashBoard />} />
          <Route path="projectDetail/:id" element={<ProjectDetail />} />
          <Route path="/user/:id" element={<DashBoardUser />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="search" element={<SearchContent />} />
          <Route path="/cancelSubscription" element={<CancelPayment />} />
          <Route path="inviteProject/:projectId" element={<InviteProject />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="/errorPayment" element={<ErrorPayment />} />
          <Route path="/cancelPaymentError" element={<CancelPaymentError />} />
          <Route path="/cancelPaymentOK" element={<CancelPaymentOK />} />   
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Modal active={modalSignIn} toggle={toggleSignIn}>
        <SigIn/>
      </Modal>
      <Modal active={modalSignUp} toggle={toggleSignUp}>
        <SignUp/>
      </Modal>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Header;
