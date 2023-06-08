import React from 'react';
import Image from 'next/image';
import PanelButton from './PanelButton';
import { motion } from 'framer-motion';
import { textAnimation, componentAnimation } from '@/utils/framerTransitions';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})

const AboutCard = ({image,title,description,direction}) => {
  return (
    <div className={`flex flex-col ${direction === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 lg:gap-10`}>

    <motion.div viewport={{ once: true }} variants={componentAnimation(direction,200,0)} initial='hidden' whileInView='visible' className='w-[full] h-[500px] md:w-[450px] md:h-[550px] rounded-lg overflow-hidden group'>
        <Image src={image} alt={title} className='w-full h-full object-cover group-hover:scale-105 duration-500'/>
    </motion.div>
    <div className='flex flex-col lg:flex-grow justify-between items-center md:items-start space-y-5 py-5 px-5 lg:px-10 w-full md:w-[400px]'>
        <motion.p viewport={{ once: true }} variants={textAnimation(0.8,'down')} initial='hidden' whileInView='visible' className={`text-white text-4xl ${staatliches.className}`}>{title}</motion.p>
        <motion.p viewport={{ once: true }} variants={textAnimation(1,'down')} initial='hidden' whileInView='visible' className='text-white text-xl lg:text-2xl text-justify'>{description}</motion.p>
        <PanelButton text='Go to Dashboard' url='/dashboard' delay={1.2}/>
    </div>

    </div>
  )
}

export default AboutCard