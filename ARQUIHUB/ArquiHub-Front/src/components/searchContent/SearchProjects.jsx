import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NoFound from './NoFound';

function SearchProjects({projects,numberProject=6}) {
  const getDate = (date) => {
    const format = date.updatedAt
      .split("T", 1)[0]
      .split("-")
      .reverse()
      .join("/");
    return format;
  };

  const [page, setPage] = useState(1);
  const indexLastCard = numberProject * page;
  const currentProjects =projects.slice(0, indexLastCard) 
  function paginado() {
    setPage(page + 1);
  }
  function previous(){
    setPage(page-1)
  }

  if(!projects.length) return <NoFound text={"projects"}/>
  return (
    <div className='flex flex-col gap-4'>
      {currentProjects.map((e,i)=>{
        return(
          <div key={i} className="border-b border-gray-300 py-4">
            <div className='flex flex-row items-center lg:gap-4'>
              <Link to={`/projectDetail/${e._id}`}><p className='text-gray-900 text-lg font-bold w-full lg:w-auto uppercase'>{e.title}</p></Link>
              <p className='border text-gray-600 border-gray-400 rounded-lg px-2 text-sm'>{e.visibility}</p>
            </div>
            <p className='line-clamp-1'>{e.description}</p>
            <p className='text-sm font-sans text-gray-600'>Update {getDate(e)}</p>
          </div>
        )
      })}
      {projects.length !== currentProjects.length && 
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
  )
}

export default SearchProjects