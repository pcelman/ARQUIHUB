import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import AvatarUser from '../avatarUser/AvatarUser'
import NoFound from './NoFound'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { orderUsers } from '../../redux/slices/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
function SearchUsers({users, numberUsers=8}) {
  const [sort, setSort] = useState("default")
  const [page, setPage] = useState(1);
  const sortUser = useSelector(state => state.user.orderUsers)
  const indexLastCard = numberUsers * page;
  const currentUsers =sortUser.slice(0, indexLastCard) 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderUsers(users, sort));
  }, [users, sort])
  function paginado() {
    setPage(page + 1);
  }
  function previous(){
    setPage(page-1)
  }
  const options = [
    /* { value: "default", label: "Az" }, */
    { value: "Az", label: "A-z" },
    { value: "Za", label: "Z-a" }
  ]

  const handleSort = ({value}) => {
    setSort(value);
  };

  if(!users.length) return <NoFound text={"users"}/>
  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className={`${numberUsers !== 8 ?"hidden" : "flex" } flex-col w-full gap-4 md:flex-row`}>
        <Select className='w-full lg:w-1/4' placeholder={` Sort by user name`} options={options} value={sort.value} onChange={handleSort} />
      </div>
    <div className='w-full flex flex-col sm:flex-row   sm:flex-wrap '>
      {currentUsers.map((e,i)=>{
        return(
          <div key={i} className="w-full my-4 sm:px-2 sm:w-1/2 lg:w-1/3 xl:w-1/4  h-full " >
            <Link className="flex mx-auto flex-col items-center gap-2 w-full h-[65vw] sm:h-[35vw] md:h-[27vw] lg:h-[20vw] xl:h-[16vw] 2xl:h-[11vw] bg-gray-50 shadow-md rounded-md p-4 cursor-pointer "  to={`/user/${e._id}`}>
            <AvatarUser img={e.avatar} className="w-14 h-14"/>
            <p className='text-lg font-bold line-clamp-1 w-full text-center'>{e.nickname}</p>
            <p>{e.name} {e.lastname}</p>
            <div className='flex gap-4 m-2'>
              <p className='bg-gray-600 rounded-md px-2 text-gray-50'>{e.posts.length} Posts</p>
              <p className='bg-gray-600 rounded-md px-2 text-gray-50'> {e.projects.length} Projects</p>
            </div>
            {/* <button className='px-2 py-0.5 text-gray-50 rounded-sm bg-gray-900'>View profile</button> */}
            </Link>
          </div>
        )
      })}

      {sortUser.length !== currentUsers.length && 
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
    </div>
  )
}

export default SearchUsers