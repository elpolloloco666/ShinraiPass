import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sideMenuText, showSideBar, arrowAnimation } from '@/utils/framerTransitions';
import { useStateContext } from '@/context';
import { useRouter } from 'next/router';

import {IoTicketOutline} from 'react-icons/io5';
import {BsCalendar4Event} from 'react-icons/bs';
import {BiCrown,BiPalette,BiUserCircle} from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
  subsets:['latin'],
  weight:['400']
})

const Sidebar = () => {

  const router = useRouter();

  const [isMenuActive,setIsMenuActive] = useState(false);
  const {currentAccount,currentPage,setCurrentPage} = useStateContext();

  const handleClick = (page) => {
    setCurrentPage(page); 
    router.push(`/dashboard/${page}`)
  } 

  return (
        <motion.div variants={showSideBar} className='relative flex flex-col h-[100vh] items-start bg-[#1f1f23] py-6 px-4 rounded-r-md'        
        initial={'hidden'}
        animate={isMenuActive ? 'visible' : 'hidden'}
        >
            <div className='flex items-center justify-center space-x-2 overflow-hidden whitespace-nowrap'>
                <IoTicketOutline className='text-[#cfcfcf] text-[30px]'/>
                <motion.p variants={sideMenuText(0.2)} className={` text-[#cfcfcf] text-3xl ${staatliches.className}`}>Shinrai Pass</motion.p>
            </div>

            <motion.button className='absolute top-[30px] -right-[15px] flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#49497f]'
            onClick={()=>setIsMenuActive(!isMenuActive)}
            variants={arrowAnimation}
            initial={'closed'}
            animate={isMenuActive ? 'open' : 'closed'}
            >
              <MdKeyboardArrowRight className='text-white text-xl m-0'/>
            </motion.button>

            <ul className='mt-32 flex flex-col space-y-5 items-start overflow-hidden'>

              <motion.li whileHover={{x: 5}} className={`flex items-center justify-center space-x-3 pr-3 overflow-hidden whitespace-nowrap ${currentPage == '' ? 'text-red-500' : 'text-[#cfcfcf]'} cursor-pointer`}
              onClick={()=>handleClick('')}>
                <BsCalendar4Event className='text-[30px]'/>
                <motion.p variants={sideMenuText(0.4)} className='text-xl'>Events</motion.p>
              </motion.li>

              <motion.li whileHover={{x: 5}} className={`flex items-center justify-center space-x-3 pr-3 overflow-hidden whitespace-nowrap ${currentPage == 'myTickets' ? 'text-red-500' : 'text-[#cfcfcf]'} cursor-pointer`}
              onClick={()=>handleClick('myTickets')}>
                <HiOutlineTicket className='text-[30px]'/>
                <motion.p variants={sideMenuText(0.4)} className='text-xl'>My Tickets</motion.p>
              </motion.li>

              <motion.li whileHover={{x: 5}} className={`flex items-center justify-center space-x-3 pr-3 overflow-hidden whitespace-nowrap ${currentPage == 'myEvents' ? 'text-red-500' : 'text-[#cfcfcf]'} cursor-pointer`}
              onClick={()=>handleClick('myEvents')}>
                <BiCrown className='text-[30px]'/>
                <motion.p variants={sideMenuText(0.5)} className='text-xl'>My Events</motion.p>
              </motion.li>

              <motion.li whileHover={{x: 5}} className={`flex items-center justify-center space-x-3 pr-3 overflow-hidden whitespace-nowrap ${currentPage == 'createEvent' ? 'text-red-500' : 'text-[#cfcfcf]'} cursor-pointer`}
              onClick={()=>handleClick('createEvent')}
              >
                <BiPalette className='text-[30px]'/>
                <motion.p variants={sideMenuText(0.6)} className='text-xl'>Create Event</motion.p>
              </motion.li>

            </ul>

            <div className='flex items-center justify-center space-x-2 overflow-hidden whitespace-nowrap absolute bottom-10'>
              <BiUserCircle className='text-[#cfcfcf] text-[30px]'/>
              <motion.p variants={sideMenuText(0.8)} className=' text-[#cfcfcf] text-base'>{ currentAccount.slice(0,5) + '...' +currentAccount.slice(currentAccount.length - 5, currentAccount.length) }</motion.p>
            </div>

        </motion.div>
    
  )
}

export default Sidebar;