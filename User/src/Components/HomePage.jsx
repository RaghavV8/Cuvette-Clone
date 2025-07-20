import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className='flex h-screen items-center text-2xl flex-col mt-20'>
        WELCOME TO CUVETTE !
        <div className="text-md flex">
          World's best Job Search Site !
        </div>
        <div className="flex flex-row gap-2 text-sm mt-4">
          <button className='bg-[#142683] text-white text-md p-2 rounded-md hover:bg-[#101b54]'>
            <Link to='/students/login'>Student Login</Link>
          </button>
          <button className='bg-[#142683] text-white text-md p-2 rounded-md hover:bg-[#101b54]'>
            <Link to='/company/login'>Company Login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
