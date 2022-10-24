import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchWhite from "../menu/search/SearchWhite"

function NavBarDos() {
  const naviagete = useNavigate()

  const handleClick = (e,id) => {
    e.preventDefault()
    const anchor = document.querySelector(id);
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div className='w-full'>
      <SearchWhite />
        {/* <div className='menu-link text-base 2xl:text-lg' onClick={(e)=> handleClick(e,"#home_id")}><Link to="/home">Home</Link></div>
        <div className='menu-link text-base 2xl:text-lg' onClick={(e)=> handleClick(e,"#posts_id")}><Link to="/home">Posts</Link></div>
        <div className='menu-link text-base 2xl:text-lg' onClick={(e)=> handleClick(e,"#news_id")}><Link to="/home">News</Link></div> */}
        {/* <div className='menu-link text-base 2xl:text-lg' ><Link to="/about-us">About us</Link></div> */}
    </div>
  )
}

export default NavBarDos