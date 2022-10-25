import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function BtnTop() {
  const [scroll, setScroll] = useState(0)

  window.onscroll = function() {
     let scroll = window.scrollY
    setScroll(scroll);
  };

  return (
    <div className={`fixed right-0 bottom-0 ${
      scroll > 300 ? "translate-x-0" : "translate-x-full"
    } ease-in-out duration-500`}>
      <button className='w-8 h-8 lg:w-10 lg:h-10 m-4 bg-gray-800 rounded-full flex justify-center items-center' onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
        <FontAwesomeIcon className='text-gray-50 text-xl' icon={faChevronUp}/>
      </button>
    </div>
  )
}

export default BtnTop