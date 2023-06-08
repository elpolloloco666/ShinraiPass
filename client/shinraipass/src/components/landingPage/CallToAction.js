import React,{useRef,useEffect} from 'react';
import {motion, useScroll, useTransform } from 'framer-motion';

import { Staatliches } from 'next/font/google';
import PanelButton from './PanelButton';

const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})

const CallToAction = () => {

  const { scrollY } = useScroll();

  const sectionRef = useRef(null);
  let offset = 0;

  useEffect(() => {
    if (sectionRef.current) {
      const { top } = sectionRef.current.getBoundingClientRect();
      offset = window.scrollY + top;
      console.log(offset);
    }
  }, []);

  const scrollRight = useTransform(scrollY,[4800,4800+500 ],[-10,10]);
  const scrollLeft = useTransform(scrollY,[4800,4800+500 ],[10,-10]); 

  return (
    <motion.div  className='bg-[#0f0f1a] w-[100vw] flex flex-col lg:flex-row items-center justify-center space-y-5 px-5 lg:px-[150px] py-[75px] md:py-[100px]'>
       
        <div className='w-full lg:w-[800px] flex flex-col items-center'>
          <motion.p style={{x:scrollRight}} className={`text-xl md:text-5xl text-white text-center ${staatliches.className}`}>Live Unforgettable Experiences</motion.p>
          <motion.p style={{x:scrollLeft}} className={`text-xl md:text-5xl text-white text-center ${staatliches.className}`}>Secure Your Spot with ShinraiPass!</motion.p>
        </div>

        <PanelButton text='Get Your Tickets!' url='/dashboard' delay={1}/>
    </motion.div>
  )
}

export default CallToAction