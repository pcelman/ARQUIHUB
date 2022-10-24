import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchNews from './SearchNews'
import SearchPost from './SearchPost'
import SearchProjects from './SearchProjects'
import SearchUsers from './SearchUsers';

function SearchAll() {
  const { queryPost } = useSelector((state) => state.post);
  const { queryUsers } = useSelector((state) => state.user);
  const { queryProjects } = useSelector((state) => state.project);
  const { queryNews } = useSelector((state) => state.newsSlice);
  return (
    <div className='flex flex-col gap-8'>
      {queryPost.length ?
      <div className='flex flex-col gap-4 bg-gray-100 px-2 py-2 shadow-md rounded-md'>
        <p className='text-lg font-medium text-gray-600 border-b-2 border-gray-300'>Posts</p>
        <div className=' 2xl:hidden'><SearchPost posts={queryPost} numberPost={3}/></div>
        <div className='hidden 2xl:block'><SearchPost posts={queryPost} numberPost={4}/></div>
      </div>:<></>}
      {queryProjects.length ?
      <div className='flex flex-col gap-4 bg-gray-100 px-2 py-2 shadow-md rounded-md'>
        <p className='text-lg font-medium text-gray-600 border-b-2 border-gray-300'>Projects</p>
        <SearchProjects projects={queryProjects} numberProject={4}/>
      </div>:<></>}
      {queryNews.length ?
      <div className='flex flex-col gap-4 bg-gray-100 px-2 py-2 shadow-md rounded-md'>
        <p className='text-lg font-medium text-gray-600 border-b-2 border-gray-300'>News</p>
        <div className=' 2xl:hidden'><SearchNews news={queryNews} numberNews={4}/></div>
        <div className='hidden 2xl:block'><SearchNews news={queryNews} numberNews={3}/></div>
      </div>:<></>}
      {queryUsers.length ?
      <div className='flex flex-col gap-4 bg-gray-100 px-2 py-2 shadow-md rounded-md'>
        <p className='text-lg font-medium text-gray-600 border-b-2 border-gray-300'>Users</p>
        <div className=' 2xl:hidden'><SearchUsers users={queryUsers} numberUsers={4}/></div>
        <div className='hidden 2xl:block'><SearchUsers users={queryUsers} numberUsers={4}/></div>
      </div>:<></>}
    </div>
  )
}

export default SearchAll