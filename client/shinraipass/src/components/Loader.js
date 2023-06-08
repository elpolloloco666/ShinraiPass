import React from 'react'; 
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center space-y-5'>
        <p className='text-white text-2xl'>Loading Data...</p>
        <BiLoaderAlt className='text-white text-[50px] animate-spin'/>
    </div>
  )
}

export default Loader;