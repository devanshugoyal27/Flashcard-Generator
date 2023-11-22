import React from 'react'
import image from '../../assets/image.png'

const MyNav = () => {
  return (
    <>
      <nav className='p-4 shadow-md bg-white '>
        <img src={image} alt="logo" width={130} className='ml-3' />
      </nav>
    </>
  )
}

export default MyNav
