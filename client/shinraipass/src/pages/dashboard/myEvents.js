import React, { useState,useEffect } from 'react';
import PanelLayout from '@/components/PanelLayout';
import ConnectWallet from '@/components/ConnectWallet';
import EventCard from '@/components/EventCard';
import { useStateContext } from '@/context';
import { useRouter } from 'next/router';

const MyEvents = () => {

  const router = useRouter();

  const {currentAccount,getUserEvents,setCurrentPage} = useStateContext();
  const [userEvents,setUserEvents] = useState([]);

  const getEvents = async() => {
    const data = await getUserEvents(); 
    setUserEvents(data);
  }

  useEffect(()=>{
    if(currentAccount) getEvents();
    setCurrentPage('myEvents');
  },[currentAccount]);

  return (
    <PanelLayout>
      {currentAccount ?
      <div className='flex flex-col space-y-3 pt-3'>
        <h2 className='text-4xl text-white text-center font-light'>My Events</h2> 
        <div className='flex flex-wrap gap-4 justify-center pb-[100px] p-5'>
        {userEvents.length > 0 ? (   
          userEvents.map(event => (
            <EventCard key={event.id} id={event.id} showName={event.showName} venue={event.venue} image={event.imageUrl} year={event.year} month={event.month} day={event.day} price={event.price} route='/dashboard/editEvent'/>
        ))  
        ): 
        <div className='w-full h-full justify-center items-center flex flex-col space-y-5'>
            <p className='text-white text-2xl'>You haven't created an event yet. Create one!</p>
            <button className='button-style' onClick={()=>{router.push('/dashboard/createEvent/')}}>
              Create Event!
            </button>
        </div>
        }
        </div>
      </div>
      :<ConnectWallet/>}
    </PanelLayout>
  )
}

export default MyEvents;