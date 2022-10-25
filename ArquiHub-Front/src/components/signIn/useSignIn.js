import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearUser, googleLogin, logUser } from '../../redux/slices/auth/loginActions';
import { showSigIn, showSignUp } from '../../redux/slices/header/headerSlice';
import { validate } from './validate';
import jwt_decode from "jwt-decode";
import useLocalStorage from '../hooks/useLocalStorage';


export const useSignIn = () => {
  const [input, setInput] = useState({email:"",password:""});
  const [errors, setErrors] = useState({initial: ""});
  const {modalSignIn, modalSignUp} = useSelector(state => state.header)
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();
  const google = window.google
  const [googleUser, setGoogleUser] = useLocalStorage("googleUser","")
  const {user} = useSelector(state => state.login)
  let token = false
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if(user){if(user.errEmail || user.errPassword) dispatch(clearUser({}))}
  };

  const handleBlur = (e) => {
    handleInputChange(e)
    setErrors(validate(input, e.target.name, errors));
  }
  
  const handleInputSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(input))
    const error = validate(input)
    if(Object.keys(error).length === 0){
      dispatch(logUser(input.email, input.password))
    }
  }
  
  const toggleSignIn = (e) => {
    e.preventDefault()
    dispatch(showSigIn(!modalSignIn))
    dispatch(showSignUp(!modalSignUp))
  }
  
  const closeModalSingIn = () => {
    dispatch(showSigIn(false))
  }

  if(user){
    token = user.token
  } 
  if(token) closeModalSingIn()

  const handleCallbackResponse=async(response)=>{
    var userObject = jwt_decode(response.credential)
    setGoogleUser(userObject)
    const userMail = userObject.email
    const avatar = userObject.picture
    const name = userObject.given_name
    const lastname = userObject.family_name
    dispatch(googleLogin(userMail, avatar, name, lastname))
    navigate(location.pathname)
  }

  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: "168699059386-nhog3hm7cgg52demaihgsskd49r5aetq.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline", size:"large"}
    )
    if(typeof googleUser === "object" && user._id) {
      dispatch(showSigIn(!modalSignIn))
      return () => {
        showSigIn(false)
      }
  }

  },[googleUser, modalSignIn])

  return { input, errors, handleInputChange, handleInputSubmit, toggleSignIn,closeModalSingIn, handleBlur};
};
