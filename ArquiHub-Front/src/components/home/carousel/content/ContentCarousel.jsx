import React from 'react'
import {Link} from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../../../redux/slices/post/postActions'

function ContentCarousel({data}) {
  /* const {post} = useSelector(state => state.post)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPost(data._id))
  },[dispatch]) */
  const ratingFormat = (rating) => {
    return Number.parseFloat(rating).toFixed(1)
  }
 
  return (
    <div className='relative h-[100vw] sm:h-[95vw] md:h-[80vw] lg:h-[60vw] xl:h-[45vw] 2xl:h-[43vw]'>
      <img className='size-img cursor-grab active:cursor-grabbing' src={data.image[0]} alt="" />
      <div className='absolute bottom-0 w-full h-[25vw] sm:h-[15vw] xl:h-[10vw] bg-black bg-opacity-60 cursor-pointer'>
        <Link to={`/postDetail/${data._id}`}>
        <div className='absolute -top-4 '>
          <div className='bg-gray-50 mx-4 sm:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 p-1.5 w-[60vw] sm:w-[45vw] lg:w-[35vw] xl:w-[20vw] xl:py-2'>
            <p className='font-medium text-sm sm:text-base lg:text-lg text-center'>{data.project_type}</p>
          </div>
          <div className='bottom-0 mx-4 sm:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 py-2 lg:py-4 xl:py-2'>
            <div className='flex flex-row'>
              <p className='text-gray-50 font-medium text-xl sm:text-2xl xl:text-3xl uppercase'>{data.title}</p>
              <span className='text-white opacity-50 px-2 font-medium text-base sm:text-xl xl:text-2xl uppercase'>{ratingFormat(data.rating)}</span>
            </div>
            <p className='text-gray-50 line-clamp-1 lg:line-clamp-2 font-light text-xs sm:text-base lg:text-lg xl:text-base 2xl:line-clamp-3'>{data.description}</p>
          </div>
        </div>
        </Link>
      </div>
      {/* <div className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2'>centrado</div> */}
    </div>
  )
}

export default ContentCarousel