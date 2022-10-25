import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./NotFound.css"
import notFoundImg from "../../assets/notFound/notFoundImg.jpeg"

function NotFound () {
    const navigate = useNavigate()
    const handleReturn = ()=>{
        navigate("/home")
    }

  return (
    <div className='errorDiv'>
        <h1 className='errorTitle'>Sorry, we can´t find the page you are looking for</h1>
        <img className='errorImg' src="https://res.cloudinary.com/do3dbemlj/image/upload/v1666244828/aboutUs/404_i9kohg.png" alt="site"/>
        <button className='errorBtn' onClick={handleReturn}>
        Return to Homepage ⮌
        </button>
    </div>
  )
}



export default NotFound