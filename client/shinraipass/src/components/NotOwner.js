import React from 'react';
import { useRouter } from 'next/router';

const NotOwner = () => {
    const router = useRouter();
  return (
    <div className='w-full h-full flex flex-col space-y-5 justify-center items-center'>
        <h2 className='text-white text-3xl font-light'>You are not the owner</h2>
        <button className='button-style' onClick={()=>{router.push('/panel/')}}>
            Go back
        </button>
    </div>
  )
}

export default NotOwner