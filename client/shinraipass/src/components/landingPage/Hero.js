import React, {useRef} from 'react'; 
import PanelButton from './PanelButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import {textAnimation} from '../../utils/framerTransitions';
import banner from '../../../public/images/sampleImage4.jpg';
import { Staatliches } from 'next/font/google';
import Image from 'next/image';


const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})

const Hero = () => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({target: ref, offset: ["start start", "end start"]});
  const y = useTransform( scrollYProgress,[0,1],['0%','80%']); 

  return (
    <motion.section ref={ref} className='relative w-[100vw] h-[100vh] overflow-hidden'>

      <motion.div style={{y}} className='w-full h-full relative'>
        <div className='w-full h-full bg-black opacity-30'/>
        <Image src={banner} alt='banner' className='absolute -z-10 top-0 left-0 w-full h-full object-cover'/>
      </motion.div>

      <div className='absolute left-0 bottom-[30%] lg:left-12 lg:bottom-32 w-full lg:w-[800px] flex flex-col justify-center md:justify-start space-y-10 px-2 lg:px-0'>
        <motion.h2 className={`text-white text-5xl md:text-7xl ${staatliches.className}`} 
         variants={textAnimation(6,'down')}
         initial='hidden'
         animate='visible'
        >Welcome to the Future of Event Ticketing</motion.h2>
        <motion.p className='text-white text-3xl'
         variants={textAnimation(6.4,'down')}
         initial='hidden'
         animate='visible'     
        >Secure and Resellable Tickets for Concerts and Festivals</motion.p>
      </div>

      <div className='absolute bottom-[50px] lg:right-[250px] lg:bottom-[100px] w-full lg:w-auto flex justify-center'>
        <PanelButton text='Explore Events!' url='/dashboard' delay={6.5}/>
      </div>

    </motion.section>
  )
}

export default Hero