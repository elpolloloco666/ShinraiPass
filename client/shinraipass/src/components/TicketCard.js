import React from 'react';
import { useRouter } from 'next/router';
import { GiTicket } from 'react-icons/gi';

const TicketCard = ({eventId,ticketId,showName,venue,year,month,day,image,owner}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/dashboard/ticket',
      query: {
        eventId: eventId,
        ticketId:ticketId,
        owner: owner
      }
    })
  }

  return (
    <div>
    <div className='group hidden lg:flex flex-col p-3 rounded-2xl space-y-4 bg-[#1a1a1a] w-[250px] h-[270px] cursor-pointer  hover:shadow-md hover:shadow-white duration-500'
    onClick={handleClick}>
        <div className='relative w-full h-[150px] overflow-hidden rounded-2xl'>
          <img src={image} alt={showName} className='object-cover w-full h-full group-hover:scale-110 duration-500'/>
          <div className='flex p-1 items-center space-x-1 rounded-lg bg-[#f13d68] absolute bottom-2 right-2'>
            <GiTicket className='text-white text-lg'/>
            <p className='text-white text-lg'>Nº {ticketId}</p>
          </div>
        </div>
        <p className='text-white text-xl font-light'>{showName}</p>
        <div className='flex justify-between items-center'>
            <p className='text-slate-500 text-sm font-light'>{year}/{month}/{day}</p>
            <p className='text-slate-500 text-sm font-light'>{venue}</p>
        </div>
    </div>

    <div className='group lg:hidden relative w-[320px] h-[200px] md:w-[450px] md:h-[200px] rounded-xl overflow-hidden'
    onClick={handleClick}>
      <img src={image} alt={showName} className='w-full h-full rounded-xl group-active:scale-110 duration-500 ease-in-out'/>
      <div className='absolute top-0 z-10 w-full h-full bg-[#1a1a1a] opacity-80 flex flex-col justify-between p-5'>
        <div className='flex justify-between items-center'>
          <p className='text-white text-xl font-light'>{showName}</p>
          <div className='flex p-1 items-center space-x-1 rounded-lg bg-[#f13d68]'>
            <p className='text-white text-lg'>Nº {ticketId}</p>
            <GiTicket className='text-white text-lg'/>
          </div>
        </div>

        <div className='flex justify-between'>
          <p className='text-white text-sm font-light'>{year}/{month}/{day}</p>
          <p className='text-white text-sm font-light'>{venue}</p>
        </div>
      </div>
    </div>

    </div>   
  )
}

export default TicketCard;