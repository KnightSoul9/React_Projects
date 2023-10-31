import React from 'react'
import {IoLogoGithub,IoLogoYoutube,IoLogoLinkedin,IoLogoDribbble} from "react-icons/io5";
function Sidebar() {
  return (
    <div className="w-[100px] h-screen border-r-[2px] fixed flex flex-col justify-around items-center">
        <h2 className='-rotate-90 tracking-widest text-black'>HOMEPAGE</h2>
        <div className='flex flex-col gap-7 mb-7 text-[20px]'>
        <IoLogoGithub className='cursor-pointer hover:scale-110 transition-all ease-in-out text-black'/>
        <IoLogoYoutube className='cursor-pointer hover:scale-110 transition-all ease-in-out text-black'/>
        <IoLogoLinkedin className='cursor-pointer hover:scale-110 transition-all ease-in-out text-black'/>
        <IoLogoDribbble className='cursor-pointer hover:scale-110 transition-all ease-in-out text-black'/>
        </div>
    </div>

  )
}

export default Sidebar