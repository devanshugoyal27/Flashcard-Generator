import React from 'react'
import { NavLink } from 'react-router-dom'

const SubNavbar = () => {
  return (
    <>
    <div className='w-[340px] md:w-[1100px] mx-auto px-2'>
      <h1 className='font-bold text-2xl md:text-3xl lg:text-2xl my-7'>Create Flashcard</h1>
     
        <div className='border-b-2 flex gap-4 text-gray-500 font-semibold text-xl' >
          <NavLink className={({isActive}) => isActive ? "border-b-4 pb-2 border-red-500 text-red-500" : ""} to="/"> Create New</NavLink>
         <NavLink className={({isActive}) => isActive ? "border-b-4 pb-2 text-red-500 border-red-500" : ""} to="/myflashcard">My Flashcard</NavLink>
        </div>
    </div>
 </> )
}

export default SubNavbar
