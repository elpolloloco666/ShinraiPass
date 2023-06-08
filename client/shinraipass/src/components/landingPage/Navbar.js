import React, { useState } from 'react'; 
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {textAnimation,sandwichMenuTop,sandwichMenuBottom,sandwichMenuMiddle,navbarMenu,menuText} from '../../utils/framerTransitions';
import { IoTicket } from 'react-icons/io5';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
  subsets:['latin'],
  weight:['400']
})


const Navbar = () => {

  const router = useRouter();  
  const [isMenuActive,setIsMenuActive] = useState(false);  

  return (
    <nav className='flex absolute z-10 top-0 w-full p-6 lg:px-10 lg:py-10 items-center justify-between'>

        <motion.div className='flex items-center space-x-3'
            variants={textAnimation(6.5,'up')}
            initial='hidden'
            animate='visible'
        >
            <h1 className={`text-white text-3xl ${staatliches.className}`}>Shinrai Pass</h1>
            <IoTicket className='text-white text-4xl md:text-5xl'/>
        </motion.div>

        <motion.ul className='hidden lg:flex items-center space-x-16'
            variants={textAnimation(6.5,'up')}
            initial='hidden'
            animate='visible'
        >
        
            <li className='group flex flex-col items-start space-y-1 cursor-pointer'>
                <a href='#about' className='text-white text-xl'>About</a>
                <div className={`bg-white h-[3px] w-0 group-hover:w-full duration-500 ease-in-out`}/>
            </li>

            <li className='group flex flex-col items-start space-y-1 cursor-pointer'>
                <a href='#faq' className='text-white text-xl'>FAQ</a>
                <div className={`bg-white h-[3px] w-0 group-hover:w-full duration-500 ease-in-out`}/>
            </li>

            <li className='group flex flex-col items-start space-y-1 cursor-pointer' onClick={()=>router.push('/dashboard')}>
                <a className='text-white text-xl'>Dashboard</a>
                <div className={`bg-white h-[3px] w-0 group-hover:w-full duration-500 ease-in-out`}/>
            </li>

        </motion.ul>

        <motion.div className='reative z-10 lg:hidden flex flex-col w-[40px] h-[40px] space-y-2 pt-2' onClick={()=>{setIsMenuActive(!isMenuActive)}}
            variants={textAnimation(6.5,'up')}
            initial='hidden'
            animate='visible'
        >
            <motion.div variants={sandwichMenuTop} animate={isMenuActive ? 'active' : 'inactive'} className='w-full h-[4px] bg-white rounded-full'/>
            <motion.div variants={sandwichMenuMiddle} animate={isMenuActive ? 'active' : 'inactive'} className='w-full h-[4px] bg-white rounded-full'/>
            <motion.div variants={sandwichMenuBottom} animate={isMenuActive ? 'active' : 'inactive'} className='w-full h-[4px] bg-white rounded-full'/>
        </motion.div>

        <motion.div variants={navbarMenu} initial='inactive' animate={isMenuActive ? 'active' : 'inactive'} className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#171717]'>
            <ul className='flex flex-col justify-center items-center w-full h-full py-10 px-5 space-y-5'>

            <motion.li variants={menuText} onClick={()=>{setIsMenuActive(!isMenuActive)}}>
                <a href='#about' className='text-white text-2xl'>About</a>
            </motion.li>

            <motion.li variants={menuText} onClick={()=>{setIsMenuActive(!isMenuActive)}}>
                <a href='#faq' className='text-white text-2xl'>FAQ</a>
            </motion.li>

            <motion.li variants={menuText} onClick={()=>{router.push('/dashboard')}}>
                <a className='text-white text-2xl'>Panel</a>
            </motion.li>

            </ul>
        </motion.div>

    </nav>
  )
}

export default Navbar