import React from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";

import { useSignIn } from "./useSignIn";

function SigIn() {
  const {input,errors ,handleInputChange, handleInputSubmit, toggleSignIn, closeModalSingIn, handleBlur} = useSignIn()
  const {user} = useSelector(state => state.login)
  let conditionEmail, conditionPassword
  if(user){
   conditionEmail = errors.email || user.errEmail
   conditionPassword = errors.password || user.errPassword
  }

  return (
    <div className="py-6 px-6 lg:px-8 font-raleway">
      <h3 className="mb-4 text-xl font-medium text-gray-900 text-center">Sign In</h3>
      <form className="space-y-6" onSubmit={handleInputSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input type="text"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500 ${conditionEmail && "border-2 focus:border-danger border-danger"}`}
            placeholder="name@example.com"
            value={input.email} name='email' onBlur={handleBlur} onChange={handleInputChange}
          />
          {conditionEmail && <span className="text-danger text-sm">{conditionEmail}</span>}
        </div>
        <div>
          <label 
            className="block mb-2 text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500  ${conditionPassword && "border-2 focus:border-danger border-danger"}`}
            value={input.password} onChange={handleInputChange} onBlur={handleBlur}
          />
          {conditionPassword && <span className="text-danger text-sm">{conditionPassword}</span>}
        </div>
        <div className="flex justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-gray-600"
              />
            </div>
            <label 
              className="ml-2 text-sm font-medium text-gray-900">
              Remember me
            </label>
          </div>
          <NavLink to="/forgotPassword">
           <span onClick={closeModalSingIn} className="cursor-pointer text-sm text-gray-900 hover:underline">
            Forgot Password?
          </span> 
          </NavLink>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
        {/* <button 
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center"
        >
          Sign in with Google
        </button> */}
        <div className="w-full flex items-center gap-4">
          <div className="border w-1/2 border-gray-600"></div>
          <p className="text-gray-800">Or</p>
          <div className="border w-1/2 border-gray-600"></div>
        </div>
        <div onClick={closeModalSingIn} id="signInDiv"></div>
        <div className="text-sm font-medium text-gray-900">
        {/* //NAVLINK  A SIGNUP*/}
        Don´t have a account?
        <span className="cursor-pointer text-gray-600 underline pl-1" onClick={toggleSignIn}>
          Sign up
        </span> 
        </div>
      </form>
      </div>
  );
}

export default SigIn;
