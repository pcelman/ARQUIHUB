import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCharacter, getTypes, getCharacters, cleanFilter } from "../actions/index"; 
import { useDispatch, useSelector } from "react-redux";
import "../styles/characterCreate.css"




export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors,setErrors] = useState({});
    const characters = useSelector(state=>state.characters)


        const [input,setInput] = useState({
            name:"",
            types :[],
            image: "",
            life: 0,
            attack: 0,
            defense: 0,
            height: 0,
            weight: 0
        })
       
        useEffect(() => {
          dispatch(getTypes());
          dispatch(getCharacters())
          if(validate(input)){
            setErrors(validate(input))
          }
          return ()=>{
            dispatch(cleanFilter())
          }
        }, []);
      

function validate(input){
  let errors = {}
  if(!input.name){ 
    errors.name = 'Fill in the name';
  } else if (characters.find(e => e.name === input.name)){
errors.name = "Name already exists"
  } else if (input.types.length === 0 || input.types.length > 2) {
    errors.types = "Select one or two types"
  }
  return errors
}

//solo incluya el tipo cuando se cumpla la condicion de que no este incluido todavia

          function handleInputChange(e){
            setInput({
              ...input,
              [e.target.name]: e.target.value
            })
            setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
            }))
          }

          function handleSelect(e){
            if (!input.types.includes(e.target.value)){
              
              setInput({
                ...input,
                types: [...input.types, e.target.value]
              })
            }
              setErrors(validate({
                ...input,
                types: [...input.types, e.target.value]
              }))
          }


                    function handleSubmit(e){
                      e.preventDefault()
                      dispatch(postCharacter(input))
                      alert("Created!")
                      setInput({
                        name:"",
                        types :[],
                        image: "",
                        life: 0,
                        attack: 0,
                        defense: 0,
                        height: 0,
                        weight: 0
                      })
                      history.push('/home')
                    }

                function handleDelete(e){
                  setInput({
                    ...input,
                    types: input.types.filter(t =>t!== e.target.value)
                  })
                }


        return (
          <div className="container-character-create"> 
          <div className="contenedor-detail-character-create">

        
            <div className="info-card-character-create">
                   <Link to = 'home'><button className="button-ch">go back</button></Link>
           
                   <h1 className="texto-character-create"> Make your own pokemon</h1>
          <div className="card-create-character">
                   <form>

                   <div>
                    <label  >Nombre: </label>
                    <input  placeholder="requred" type = "text"  value = {input.name}  name = "name" onChange={handleInputChange}/>

                      {errors.name &&(
                        <p className="error">{errors.name}</p>
                      )}
                   </div>

                    <div>
                    <label>Image: </label>
                    <input type = "text"  value = {input.image}  name = "image"  onChange={handleInputChange} />
                    </div>

                    <div>
                    <label> Health Power: </label><input type = "number"  value = {input.life} name = "life" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Attack: </label> 
                    <input type = "number"  value = {input.attack}  name = "attack" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Defense: </label> <input
                     type = "number" value = {input.defense}name = "defense" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Height: </label> <input
                     type = "number" value = {input.height} name = "height" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Weight: </label>
                    <input type = "number" value = {input.weight} name = "weight" onChange={handleInputChange} />
                    </div>


                   <div className="opciones-character-create">





                   <select onChange={handleSelect}> {types.map((e) => (  <option value={e.name}>{e.name}</option> ))}
                   </select>

        



                   <div>{input.types.map(e => e,",")}</div>
                  {input.types.map(el=>
                    <div>
                      <p> {el}</p> <button value={el} className="botonX" onClick={(el)=>handleDelete(el)}>X</button> 
                      </div>)}
                      </div>



                      <button onClick={handleSubmit} type= 'submit' disabled={Object.keys(errors).length? true : false} >Create</button>

                      </form>
                      </div>

                      <div>
                      </div> 

                      </div> 
                    </div>
                    
          </div>
        

        )

        
     }