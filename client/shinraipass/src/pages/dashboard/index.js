import React, { useEffect, useState } from 'react';
import PanelLayout from '@/components/PanelLayout';
import EventCard from '@/components/EventCard';

import { useStateContext } from '@/context';
import Loader from '@/components/Loader';
import ConnectWallet from '@/components/ConnectWallet';

const index = () => {

  const {getAllEvents,setCurrentPage,currentAccount} = useStateContext();
  
  const [events,setEvents] = useState([]);

  const getEvents = async() => {
    const data = await getAllEvents(); 
    setEvents(data); 
  }

  useEffect(()=>{
    if(currentAccount) getEvents();  
    setCurrentPage('');
  },[currentAccount]);


  return (
    <PanelLayout>
        {!currentAccount ? (
          <ConnectWallet/>
        )
        :
        (
          <div className='flex flex-col space-y-3 pt-3'>
            <h2 className='text-4xl text-white text-center font-light'>Events</h2>         
            <div className='flex flex-wrap gap-5 justify-center pb-[100px] p-5'>
              {events.length > 0 ? (                        
                events.map(event => (
                <EventCard key={event.id} id={event.id} showName={event.showName} venue={event.venue} image={event.imageUrl} year={event.year} month={event.month} day={event.day} price={event.price} route='/dashboard/details'/>            
              ))             
              ):<Loader/>}   
            </div>
          </div>
        )}
    </PanelLayout>
  )
}

export default index;