import React from 'react';
import { useStateContext } from '@/context';

const ConnectWallet = () => {

    const {connectAccount} = useStateContext();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center space-y-5 py-5'>
        <p className='text-white text-2xl'>Please connect your wallet</p>
        <button onClick={()=>connectAccount()} className='w-[250px] button-style'>Connect!</button>
    </div>
  )
}

export default ConnectWallet