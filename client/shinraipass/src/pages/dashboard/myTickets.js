import React, {useState, useEffect} from 'react';
import PanelLayout from '@/components/PanelLayout';
import TicketCard from '@/components/TicketCard';
import ConnectWallet from '@/components/ConnectWallet';
import { useStateContext } from '@/context';
import { useRouter } from 'next/router';

const myTickets = () => {

  const router = useRouter();

  const {getUserTickets,currentAccount,setCurrentPage} = useStateContext();

  const [tickets, setTickets] = useState([]);

  const getTickets = async() => {
    const data = await getUserTickets();
    setTickets(data);
  } 

  useEffect(()=>{
    if(currentAccount) getTickets();
    setCurrentPage('myTickets');
  },[currentAccount]);


  return (
    <PanelLayout>
    {currentAccount?
      <div className='flex flex-col space-y-3 pt-3'>
        <h2 className='text-4xl text-white text-center font-light'>My Tickets</h2> 
        <div className='flex flex-wrap gap-5 justify-center pb-[100px] p-5'>
          {tickets.length > 0 ? (   
            tickets.map(ticket => (
            <TicketCard key={`${ticket.showName}-${ticket.ticketId}`} eventId={ticket.eventId} ticketId={ticket.ticketId} showName={ticket.showName} venue={ticket.venue} image={ticket.imageUrl} year={ticket.year} month={ticket.month} day={ticket.day} owner={ticket.owner}/>
            ))  
          ):
          <div className='w-full h-full justify-center items-center flex flex-col space-y-5'>
            <p className='text-white text-2xl'>You don't have tickets yet. Get some!</p>
            <button className='button-style' onClick={()=>{router.push('/dashboard/')}}>
              Explore Events!
            </button>
          </div>
          }
        </div>
      </div>
    : <ConnectWallet/>}
    </PanelLayout>
  )
}

export default myTickets;