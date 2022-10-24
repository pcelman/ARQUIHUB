import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterType from '../home/posts/filterType/FilterType'
import Order from '../home/posts/order/Order'
import NoFound from './NoFound'
import SearchbarContent from './SearchbarContent'

function SearchPost({posts,numberPost = 8}) {
  const ratingFormat = (rating) => {
    return Number.parseFloat(rating).toFixed(1)
  }
  const {orderPosts} = useSelector(state => state.post)
  const [page, setPage] = useState(1);
  const indexLastCard = numberPost * page;
  const currentPost =orderPosts.slice(0, indexLastCard) 
  function paginado() {
    setPage(page + 1);
  }
  function previous(){
    setPage(page-1)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className={`${numberPost !== 8 ?"hidden" : "flex" } flex-col w-full gap-4 md:flex-row`}>
        <div className='w-full md:w-1/2 xl:w-1/4'><Order/></div>
        <div className='w-full md:w-1/2 xl:w-1/4'><FilterType/></div>
      </div>
      {!posts.length ? <NoFound text={"posts"}/>:<>
        <div className='flex w-full flex-wrap  '>
          {currentPost.map((e,i) => {
            return (
              <div key={i} className="flex flex-col gap-2 w-full sm:px-2 sm:w-1/2 xl:w-1/3 2xl:w-1/4 pb-8  cursor-pointer">
                <Link to={`/postDetail/${e._id}`}>
                <img className='w-full h-[40vw] lg:h-[25vw] xl:h-[20vw] 2xl:h-[15vw] object-cover object-bottom' src={e.image[0]} alt="" />
                <p className='text-base font-bold'>{e.title}</p>
                <p className='line-clamp-2'>{e.description}</p>
                </Link>
              </div>
            )
          })}
          {orderPosts.length !== currentPost.length && 
            <div className="w-full flex justify-between font-medium ">
            {page !== 1 
            ? <p 
            onClick={(e) => previous(e)} 
            className='cursor-pointer text-base text-gray-50 px-2 py-1.5 bg-gray-500 rounded-md' 
            >
              Show less
            </p>
            :<div></div>}
             <p 
             onClick={(e) => paginado(e)} 
             className='cursor-pointer text-end text-base text-gray-50 px-2 py-1.5 bg-gray-700 rounded-md'
             >
              See more...
             </p>
            </div>
          }
        </div>
      </>
      }
    </div>
  )
}

export default SearchPost