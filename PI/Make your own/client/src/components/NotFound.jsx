import React from "react";
import { Link } from "react-router-dom"
import "../styles/notFound.css"

export default function Home(){

return (
    <div className="containerNF">

    <Link to = "/home"><button className="homeNF ">HOME</button></Link>
    </div>
)



}