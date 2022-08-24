import React from "react";
import { Link } from "react-router-dom"
import "../styles/landingPage.css"

export default function LandingPage(){
    return(
        <div className="containerLP">
           <div className="divdelBotonLP">

           
            <Link to = "/home">
                <button className="homeBtnLP">GO!!</button>
            </Link>
            </div>    
        </div>
    )
}