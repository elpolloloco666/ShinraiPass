import React from 'react'; 
import { motion } from 'framer-motion';
import { loaderGate, loaderText } from '@/utils/framerTransitions';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})

const OpenTransition = () => {   
  return (
    <motion.div variants={loaderGate} initial='closed' animate='opened' className='fixed z-30 top-0 left-0 w-[100vw] h-[100vh] flex space-x-2 justify-center items-center bg-black'
    >
    {
      Array.from('The stage is set. Are you ready?').join("").split(" ").map((letter,i)=> (
        <motion.span key={letter+i} className={`text-white text-2xl md:text-5xl text-center ${staatliches.className}`}
          variants={loaderText(i*0.4)}>
            {letter}
        </motion.span>
      ))
    }           
    </motion.div>
  )
}

export default OpenTransition;