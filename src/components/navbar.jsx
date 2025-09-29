import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-800 py-3 text-white'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">Taskly</span>
        </div>
        <ul className="flex gap-8 mx-8 ">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
