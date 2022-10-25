import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { orderNews } from '../../redux/slices/sliceNews/newsActions';
import NoFound from './NoFound'

function SearchNews({news, numberNews = 8}) {
  const [sort, setSort] = useState("default")
  const [page, setPage] = useState(1);
  const {order} = useSelector(state => state.newsSlice)
  const indexLastCard = numberNews * page;
  const currentNews =order.slice(0, indexLastCard) 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(orderNews(news, sort));
  }, [news, sort])

  function paginado() {
    setPage(page + 1);
  }
  function previous(){
    setPage(page-1)
  }

  const GroupedOption = [
    {
      label: "Name",
      options: [
        { value: "Az", label: "A-z" },
        { value: "Za", label: "Z-a" },
      ],
    },
    {
      label: "Date",
      options: [
        { value: "recent", label: "Recent to" },
        { value: "old", label: "Old to" },
      ],
    },
  ];
  const handleSort = ({value}) => {
    setSort(value);
  };

  if(!news.length) return <NoFound text={"news"}/>
  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className={`${numberNews !== 8 ?"hidden" : "flex" } flex-col w-full gap-4 md:flex-row`}>
        <Select className='w-full lg:w-1/4' placeholder={` Sort by...`} options={GroupedOption} value={sort.value} onChange={handleSort} />
      </div>
    <div className='flex flex-col gap-8 w-full lg:flex-wrap lg:flex-row lg:justify-between'>
      {currentNews.map((e,i)=>{
        return(
          <div key={i} className="flex flex-col gap-2 lg:w-[40vw] xl:w-[38vw] 2xl:w-[22vw] cursor-pointer">
            <Link to={`/newsDetail/${e.id}`}>
            <img className='w-full h-[50vw] lg:h-[35vw] xl:h-[25vw] 2xl:h-[15vw] object-cover object-bottom' src={e.image} alt="" />
            <p className='font-bold text-gray-900 text-lg text-start'>{e.title}</p>
            <p className='text-gray-500 text-end'>{e.date}</p>
            <p className='line-clamp-3 text-gray-700 text-base'>{e.description}</p>
            </Link>
          </div>
        )
      })}
      {news.length !== currentNews.length && 
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

export default SearchNews