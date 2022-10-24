import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./NotFound.css"

function Unauthorized () {
    const navigate = useNavigate()
    const handleReturn = ()=>{
        navigate("/home")
    }

  return (
    <div className='errorDiv'>
        <h2 className='errorTitle'>Sorry, Arquihub members only!</h2>
    <h1 className='errorTitle'> <span className='errorSpan'>Sign in</span> or <span className='errorSpan'>Register</span> to access </h1>
        <img className='errorImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Under_construction_icon-yellow.svg/2484px-Under_construction_icon-yellow.svg.png' alt="site"/>
        <button className='errorBtn' onClick={handleReturn}>
        Return to Homepage ⮌
        </button>
    </div>
  )
}



export default Unauthorized