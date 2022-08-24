import React from "react";
import { Link } from "react-router-dom";
import  { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, cleanFilter } from "../actions/index";
import "../styles/detail.css"

export default function Detail(props) {
    const dispatch = useDispatch()
    const myCharacter = useSelector((state) => state.detail)

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        return ()=>{
            dispatch(cleanFilter())
          }
    }, [dispatch])
    
    return (
        <div className="fondo-detail">
            <div className="contenedor-detail">

            
            <div className="card-detail">

        {
            myCharacter.length > 0 ?
            <div>
                <h1 className="nombre-detail">{myCharacter[0].name}</h1>
                <img src = {myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image} alt="image not submitted" width ="110px" height="150px" />
                <h2>Health Power: {myCharacter[0].hp}</h2>
                <p>Attack: {myCharacter[0].attack}</p>
                <p>Defense: {myCharacter[0].defense}</p>
                <p>Speed: {myCharacter[0].speed}</p>
                <p>Height: {myCharacter[0].height}</p>
                <p>Weight: {myCharacter[0].weight}</p>
                <p>Type: { myCharacter[0].types.map((e)=><p>{e.name}</p>)   }</p>


                </div> : <p>Loading...</p>
        }
        <div className="volver">

        <Link to = "/home">
            
            <button className="button-detail">Back</button>
        </Link>
        </div>
        </div>
        </div>
    </div>
)
}

