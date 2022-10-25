import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
      <h2 className=" font-light">
        <Link to="/home">
        <span className="font-semibold">ARQUI</span>HUB
        </Link>
      </h2>
  )
}

export default Logo