import React from "react";
import  { useDispatch, useSelector } from "react-redux";
import { filterCharactersByTypes, filterCreated, orderByName, orderByAttack, getTypes, getCharacters, cleanFilter } from "../actions/index.js"
import SearchBar from "./SearchBar"
import "../styles/navBar.css"




export default function NavBar({ setCurrentPage, setOrder }){

    const dispatch = useDispatch()
    const charactersFilter = useSelector ((state) => state.charactersFilter)
   


    function handleClick(e){
        e.preventDefault();
        dispatch(cleanFilter());
        dispatch(getCharacters());
                }

    function handleFilterStatus(e){
        dispatch(filterCharactersByTypes(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
   
    
    function handleSort(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
       }

       function handleAttackSort(e){
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
       }

    return (
    <div className="general-navBar">

        
        
        <button onClick = {e => {handleClick(e)}}>
            RELOAD
        </button>
        <div className = "filtros">
            <select onChange={e=>handleSort(e)}>
                 <option >Order alphabetically</option>
                <option value='asc'>Order by: A-Z</option>
                <option value='desc'>Order by: Z-A</option>
                </select>

                <select onChange={e=>handleAttackSort(e)}>
                <option value='all'>Sort by STRENGTH</option>
                <option value='attackMin'>Sort by: Min STR</option>
                <option value='attackMax'>Sort by: Max STR</option>
                </select>

            <select onChange={e=>handleFilterCreated(e)}>
                <option value = "all">Original/Custom</option>
                <option value = "api">Original Pokemons</option>
                <option value = "db">Custom Pokemons</option>
               
            </select>
          
            <select onChange={e=>handleFilterStatus(e)}>
                <option value = "Types">Types</option>
                <option value = "normal">Normal Pokemons</option>
                <option value = "fighting">Fighting Pokemons</option>
                <option value = "flying">Flying Pokemons</option>
                <option value = "poison">Poison Pokemons</option>
                <option value = "ground">Ground Pokemons</option>
                <option value = "rock">Rock Pokemons</option>
                <option value = "bug">Bug Pokemons</option>
                <option value = "ghost">Ghost Pokemons</option>
                <option value = "steel">Steel Pokemons</option>
                <option value = "fire">Fire Pokemons</option>
                <option value = "water">Water Pokemons</option>
                <option value = "grass">Grass Pokemons</option>
                <option value = "electric">Electric Pokemons</option>
                <option value = "psychic">Psychic Pokemons</option>
                <option value = "ice">Ice Pokemons</option>
                <option value = "dragon">Dragon Pokemons</option>
                <option value = "dark">Dark Pokemons</option>
                <option value = "fairy">Fairy Pokemons</option>
                <option value = "unknown">Unknown Pokemons</option>
                <option value = "shadow">Shadow Pokemons</option>
            </select>
            <div className="SearchBar">
            <SearchBar/>
            </div>
 </div>
           
        </div>
       
       
    )
}

