import React from 'react';
import { useStateContext } from '@/context';
import { useRouter } from 'next/router';

import {BsCalendar4Event} from 'react-icons/bs';
import {BiCrown,BiPalette} from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';

const TabBar = () => {

    const {currentPage,setCurrentPage} = useStateContext();

    const router = useRouter();

    const handleClick = (page) => {
        setCurrentPage(page); 
        router.push(`/dashboard/${page}`)
    }

  return (
    <div className='w-[100%] h-[80px] bg-[#181826]'>
        <ul className='grid grid-cols-4 items-center h-full'>
            <li className={`h-full flex justify-center items-center ${currentPage == '' && 'border-t-2 border-t-red-500 duration-500'}`}
                onClick={()=>handleClick('')}>
                <BsCalendar4Event className={`text-[30px] ${currentPage == '' ? 'text-red-500' : 'text-[#cfcfcf]'} duration-500`}/>
            </li>

            <li className={`h-full flex justify-center items-center ${currentPage == 'myTickets' && 'border-t-2 border-t-red-500 duration-500'}`}
                onClick={()=>handleClick('myTickets')}>
                <HiOutlineTicket className={`text-[30px] ${currentPage == 'myTickets' ? 'text-red-500' : 'text-[#cfcfcf]'} duration-500`}/>
            </li>

            <li className={`h-full flex justify-center items-center ${currentPage == 'myEvents' && 'border-t-2 border-t-red-500 duration-500'}`}
                onClick={()=>handleClick('myEvents')}>
                <BiCrown className={`text-[30px] ${currentPage == 'myEvents' ? 'text-red-500' : 'text-[#cfcfcf]'} duration-500`}/>
            </li>

            <li className={`h-full flex justify-center items-center ${currentPage == 'createEvent' && 'border-t-2 border-t-red-500 duration-500'}`}
                onClick={()=>handleClick('createEvent')}>
                <BiPalette className={`text-[30px] ${currentPage == 'createEvent' ? 'text-red-500' : 'text-[#cfcfcf]'} duration-500`}/>
            </li>
        </ul>
    </div>
  )
}

export default TabBar;