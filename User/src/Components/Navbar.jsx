import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-white w-screen h-20 shadow-md border-gray-400'>
        <div className="flex">
            <div className="flex-col">
            <img src="/logo.svg" alt="Cuvette-Logo" className='h-12 w-36 m-4 ml-6'/>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
