
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { deleteFavourite, updateFavourite } from '../../../../redux/slices/favourite/favouriteActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faBookmark as solid} from '@fortawesome/free-solid-svg-icons';
import  {faBookmark as regular} from '@fortawesome/free-regular-svg-icons';
import { getUser } from '../../../../redux/slices/user/userActions';
import { changeShowSingIn} from '../../../../redux/slices/header/headerActions';
export default function FavouritePost() {
  const [favourite, setFavourite] = useState("") 
  const [habilited, setHabilited] = useState(false) 
  const {user} = useSelector(state=>state.user)
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"))
  const {modalSignIn} = useSelector(state => state.header)
  useEffect(() => {
    if(token)dispatch(getUser(token.userId));    
  }, [dispatch])


    const handleClick = (e)=>{
      e.preventDefault();
      setFavourite(!favourite);
      const change = !favourite
      if(change) dispatch(updateFavourite(id,{user_id:token.userId}))
      else dispatch(deleteFavourite(id,{user_id:token.userId}))} 

      const toggleSignIn = (e) => {
        e.preventDefault()
        dispatch(changeShowSingIn(!modalSignIn))
      }
      
    
    if(user.length===0){
      return(
        <div>
          <button onClick={toggleSignIn}><FontAwesomeIcon icon={regular} /> </button>
        </div>
      )
    }
    else if(habilited){
      return (
        <div>
        {<button onClick={handleClick}><FontAwesomeIcon icon={favourite?solid:regular} /></button>}
           </div> 
      )
    }
      else{
        if (user.favourites.find(e=>e._id===id)){
          setFavourite(true);
          setHabilited(true);
        }else{
          setFavourite(false);
          setHabilited(true);
        } 
         }
      };
        
    


