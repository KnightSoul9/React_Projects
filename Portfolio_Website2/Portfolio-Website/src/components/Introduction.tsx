import React from 'react'

function Introduction() {
  return (
    <div className='flex justify-center flex-col items-center'>
        <div className='h-[120px] border-r-[1px] '></div>
        <div className='w-[5px] h-[5px] bg-green-600 rounded-full'></div>
        <h2 className='mt-5 text-black font-medium text-[15px] tracking-widest'>HELLO! MY NAME IS</h2>
        <h2 className='text-black text-[70px] tracking-widest mt-20'>SATYAM</h2>
        <img src="" alt="Profile pics" className='w-[160px] h-[160px] bg-gray-200 p-7 rounded-full mt-10'/>
    </div>
  )
}

export default Introduction