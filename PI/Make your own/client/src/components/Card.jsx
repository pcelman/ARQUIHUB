import React from "react";
import '../styles/card.css';


export default function Card({  name, image, types, id }){



    return(      
            
                <div className="card" > 
            
            

                   <h1 className="name-card"  >{name.charAt(0).toUpperCase()+ name.slice(1)}</h1>
                   <h5 className="type">{types?.map(type => (< p  >{type.name}  </p>))} </h5>

                

                   <img src={image} alt = "Pokemon" width="200px" height="250px"/>
              </div>     
    );
}