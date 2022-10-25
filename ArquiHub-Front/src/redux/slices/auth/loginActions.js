import axios from "axios";
import { AUTH_SIGNUP, AUTH_LOGIN, GOOGLE_LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from "../constants";
import { login, logout, register, googleLog, clearLogin, forgotPassword, resetPassword,  } from "./loginSlice";


export const logUser=(email,password)=>(dispatch)=>{
    axios.post(AUTH_LOGIN, {email, password})
    .then(res=>dispatch(login(res.data)))
    .then(data => window.localStorage.setItem("token", JSON.stringify(data.payload)))
    .catch(e=>{
        dispatch(login(e.response.data))
        window.localStorage.setItem("token", null)
    });
}

export const logOutUser=()=>(dispatch)=>{
    const token = window.localStorage.getItem("token")
    if(token){
        dispatch(logout(window.localStorage.removeItem("token", "google")
        ))
    }
}

export const registerUser=(name, lastname, nickname, email, password)=>(dispatch)=>{
    axios.post(AUTH_SIGNUP, {name, lastname, nickname, email, password})
    .then(res=>dispatch(register(res.data)))
    .then(data=> window.localStorage.setItem("token", JSON.stringify(data.payload)))
    .catch(e => {
        dispatch(register(e.response.data))
        window.localStorage.setItem("token", null)})
}

export const googleLogin=(email, avatar, name, lastname)=>(dispatch)=>{
     axios.post(GOOGLE_LOGIN, {email:email, avatar: avatar, name: name, lastname: lastname})
    .then(res => dispatch(googleLog(res.data)))
    .then(data=> window.localStorage.setItem("token", JSON.stringify(data.payload)))
    .catch(e=>console.log(e.response.data)
);
}

export const clearUser = (state) =>{
    return clearLogin(state)
}
                
export const forgotPass=(email)=>(dispatch)=>{
    axios.post(FORGOT_PASSWORD, {email: email})
   .then(res=> dispatch(forgotPassword(res.data)))
   .catch(e=>console.log(e.response.data)
);
}
 

export const resetPass=(id, token ,email, password, password2)=>(dispatch)=>{
    axios.post(RESET_PASSWORD, {id: id , token: token , email: email, password:password, password2:password2})
   .then(res=>dispatch(resetPassword(res.data)))
   .then(alert("You can login now with your new password"))
   .catch(e=>console.log(e.response.data)
);
}
               