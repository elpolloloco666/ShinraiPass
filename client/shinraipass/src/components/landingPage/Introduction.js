import React from 'react';
import { motion } from 'framer-motion';
import { textAnimation } from '@/utils/framerTransitions';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})

const Introduction = () => {

  return (
    <div className='relative w-[100vw] h-[100vh] lg:h-[150vh] bg-[#131313] flex flex-col lg:flex-row px-5 lg:px-[100px] space-y-5 justify-center items-center overflow-hidden'>

      <div className='relative z-10 w-full lg:w-[1000px] flex flex-col justify-center items-center lg:justify-start lg:items-start px-5 space-y-5'>
        
        <motion.p className={`text-white text-4xl md:text-5xl ${staatliches.className}`}
        viewport={{ once: true }} variants={textAnimation(0.8,'down')} initial='hidden' whileInView='visible' 
        >
          Buying and selling event tickets has never been easier or more secure
        </motion.p>

        <motion.p className='text-white text-xl text-justify'
          viewport={{ once: true }} variants={textAnimation(0.9,'down')} initial='hidden' whileInView='visible' 
        >
          ShinraiPass harnesses the power of blockchain technology to provide you with authentic and resellable event tickets for concerts and festivals
        </motion.p>

      </div>

      <motion.div className='relative bottom-[100px] lg:right-[200px] w-full h-[250px] md:w-[600px] md:h-[400px] lg:w-[1200px] lg:h-[400px] bg-black rounded-xl'
      viewport={{ once: true }}  initial={{x:100, opacity:0}} whileInView={{x:0,opacity:0.6}} transition={{duration:1,delay:0.5,bounce:0}}
      >
        <img  src='/images/sampleImage3.jpg' alt='sample concert3 image' className=' w-full h-full object-cover rounded-xl shadow-blue-700 shadow-2xl'/>
      </motion.div>

    </div>
  )
}

export default Introduction