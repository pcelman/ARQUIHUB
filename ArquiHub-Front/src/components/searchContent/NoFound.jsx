import React from 'react'

function NoFound({text}) {
  return (
    <div className='flex justify-center items-center w-full'>
      <p className='text-gray-600 font-medium text-lg'>No {text} found!</p>
    </div>
  )
}

export default NoFound