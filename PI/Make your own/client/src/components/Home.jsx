import React from "react";
import {useState, useEffect} from "react"
import  { useDispatch, useSelector } from "react-redux";
import { getCharacters, getTypes } from "../actions/index.js"
import { Link } from "react-router-dom"
import  Card  from "./Card"
import Paginado from "./Paginado"
import NavBar from "./NavBar"
import "../styles/home.css"




export default function Home(){

    const dispatch = useDispatch()
    const charactersFilter = useSelector ((state) => state.charactersFilter)
    const [order, setOrder] = useState("")
    const[currentPage, setCurrentPage] = useState(1)
    const[charactersPerPage, setCharactersPerPage] = useState(12)
    const indexOfLastCharacter = currentPage * charactersPerPage 
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
    const currentCharacters = charactersFilter.slice(indexOfFirstCharacter, indexOfLastCharacter)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }




    useEffect(()=>{
        dispatch(getTypes())
        dispatch(getCharacters())
    },[dispatch]) 





    return (
    <div className="container-home">
        <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder}/>
        <div className="filtros-home">

        <div className="boton-y-titulo">

        <Link to = "/character"><button className="home-create-button">CREATE</button></Link>
        
        <h1 className="titulo-home">Pokemon</h1>
        </div>
   

            

            <div className="main">
 </div>
 
            <Paginado
            charactersPerPage={charactersPerPage}
            charactersFilter={charactersFilter.length}
            paginado={paginado}
            currentPage={currentPage}
            />
          
<div className="div-cards">


        {currentCharacters?.map((e) =>{ 
            return (
                <div >
                    <Link to ={"/pokemon/" + e.id}> 
                        <Card key= {e.id} name = {e.name} image= {e.image ? e.image : e.otraImagen } types= {e.types} types2= {e.Types}/>
                    </Link>
                 </div>
           );
        })}

        </div>
       
        </div>
        {charactersFilter.length === 0 && <p> Loading... </p>}
        </div>
       
    )
}

