import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/slices/auth/loginActions"
import {Navlink, useNavigate} from "react-router-dom"
import { showSigIn, showSignUp } from "../../redux/slices/header/headerSlice";
import { useSignUp } from "./useSignUp";
import { useEffect } from "react";


function SignUp() {
  const {input, errors, handleInputChange, hanldeBlur,toggleSignIn ,handleInputSubmit} = useSignUp()
  const {user} = useSelector(state => state.login)
  let matchEmail = errors.email
  let matchNick = errors.userName
  if(user){
    matchNick = errors.userName || user.errorNick
   matchEmail = errors.email || user.errorMail  
  }
  /* useEffect(()=>{

    return () => {
      window.localStorage.removeItem("error")
    }
  },[user]) */
  /* const {modalSignIn, modalSignUp} = useSelector(state => state.header)
  const dispatch = useDispatch()

  const toggleSignIn = (e) => {
    e.preventDefault()
    dispatch(showSignUp(!modalSignUp))
    dispatch(showSigIn(!modalSignIn))
  }
  const [name, setName]=useState("")
  const [lastname, setLastname]=useState("")
  const [nickname, setNickname]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [confirmPassword, setConfirmPassword]=useState("")


  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser(
      name,
      lastname,
      nickname,
      email,
      password,
      confirmPassword))
  } */

  return (
    <div className="py-6 px-6 lg:px-8 font-raleway">
      <h3 className="mb-4 text-xl font-medium text-gray-900 text-center">
        Sign Up
      </h3>
      <form className="space-y-6" onSubmit={handleInputSubmit}>
        <div>
          <label  
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${errors.name && "border-2 focus:border-danger border-danger"}`}
            placeholder="first name"
            onChange={handleInputChange}
            value={input.name}
            onBlur={hanldeBlur}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${errors.lastName && "border-2 focus:border-danger border-danger"}`}
            placeholder="Last name"
            onChange={handleInputChange}
            value={input.lastName}
            onBlur={hanldeBlur}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>
        <div>
          <label
           
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            User name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${matchNick && "border-2 focus:border-danger border-danger"}`}
            placeholder="user name"
            onChange={handleInputChange}
            value={input.userName}
            onBlur={hanldeBlur}
          />
          {matchNick && <span className="error-text">{matchNick}</span>}
        </div>
       
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${matchEmail && "border-2 focus:border-danger border-danger"}`}
            placeholder="name@example.com"
            onChange={handleInputChange}
            value={input.email}
            onBlur={hanldeBlur}
          />
          {matchEmail && <span className="error-text">{matchEmail}</span>}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${errors.password && "border-2 focus:border-danger border-danger"}`}
            onChange={handleInputChange}
            value={input.password}
            onBlur={hanldeBlur}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <div>
          <label

            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className={`bg-gray-50 border-b-2 border-gray-50 text-gray-900 text-sm focus:outline-none block w-full p-2.5 focus:border-gray-500
            ${errors.confirmPassword && "border-2 focus:border-danger border-danger"}`}
            onChange={handleInputChange}
            value={input.confirmPassword}
            onBlur={hanldeBlur}
         />
         {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>
        <div className="flex justify-between"></div>
        <button
          type="submit"
          className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center"
        >
          Create account & Login
        </button>

        {/* <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center"
        >
          Sign up with Google
        </button> */}
        <div className="text-sm font-medium text-gray-900">
          Have an account?
          <span className="cursor-pointer text-gray-600 underline pl-1" onClick={toggleSignIn}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
