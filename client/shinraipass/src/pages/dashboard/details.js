import React, { useEffect, useState } from 'react';
import PanelLayout from '@/components/PanelLayout';
import Loader from '@/components/Loader';
import ConnectWallet from '@/components/ConnectWallet';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context';

import { SiEthereum } from 'react-icons/si';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Details = () => {

  const [eventData, setEventData] = useState({});
  const [totalSupply, setTotalSupply] = useState(0);
  const [tickets,setTickets] = useState(1);
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText,setButtonText] = useState('Get Your Tickets!');

  const router = useRouter(); 
  const {id} = router.query;

  const {currentAccount,getEvent, buyTickets, getNumberOfTicketsPurchased, getTotalSupply} = useStateContext();

  const getData = async() => {
    const data = await getEvent(id);
    setEventData(data);
    const ticketsPurchased = await getNumberOfTicketsPurchased(id);
    setTicketsPurchased(ticketsPurchased);
    const supply = await getTotalSupply(id);
    setTotalSupply(supply);
  }

  useEffect(()=>{
    if(currentAccount){
      if(id){
        getData();
        if(eventData.purchaseLimit <= ticketsPurchased) setButtonText('Purchase limit reached');
    }
  }
  }, [currentAccount,id,ticketsPurchased,totalSupply]);

  const handleBuy = async(amount) => {
    try {
      setIsLoading(true);
      setButtonText('processing...');
      const total = amount * eventData.price; 
      await buyTickets(id,amount,total);
      setIsLoading(false);
      setButtonText('Success!');
      setTimeout(()=>{
        router.push('/dashboard/myTickets');
      },1500);
    } catch (error) {
      console.log('error');
      setIsLoading(false);
      setButtonText('Something went wrong');
      setTimeout(()=>{
        router.reload();
      },1500);
    }
    
  }

  return (
    <PanelLayout hideTabBar={true}>
      {currentAccount ?
      <div className='flex justify-center md:my-10 md:mx-10 lg:m-0'>
      {eventData ? (
          <div className='relative flex flex-col bg-[#1f1f23] md:py-7 md:px-7 rounded-2xl space-y-5 md:space-y-8 items-center'>

            <div className='relative'>
              <div onClick={()=>{router.back()}} className='lg:hidden absolute top-5 left-5 bg-black opacity-50 p-3 rounded-full'><MdKeyboardArrowLeft className='text-white text-[30px]'/></div>
              <img src={eventData.imageUrl} className='w-[100vw] h-[400px] md:w-[500px] md:h-[350px] lg:w-[600px] lg:h-[300px] object-cover md:rounded-2xl'/>
              <div className='md:hidden absolute bottom-0 w-full h-[40px] bg-gradient-to-b from-transparent to-[#1f1f23]'/>
            </div>

            <div className='absolute z-10 top-[180px] md:static bg-[#1f1f23] md:bg-transparent opacity-90 md:opacity-100 rounded-t-[40px] md:rounded-none flex flex-col w-full space-y-8 px-3 pt-6 pb-[50px] md:px-[50px] md:pt-0 md:pb-0'>

              <h2 className='text-white text-2xl md:text-3xl font-light text-center'>{eventData.showName}</h2>

              <div className='grid grid-cols-2 text-sm md:text-base'>
                
                <div className='flex flex-col items-center'>
                  <p className='text-slate-300'>Date</p>
                  <p className='text-white'>{eventData.day}/{eventData.month}/{eventData.year}</p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-slate-300'>Venue</p>
                  <p className='text-white'>{eventData.venue}</p>
                </div>

              </div>

              <div className='grid grid-cols-3 text-sm md:text-base'>
                
                <div className='flex flex-col items-center'>
                  <p className='text-slate-300'>Available Tickets</p>
                  <p className='text-white'>{eventData.numberOfTickets - totalSupply}/{eventData.numberOfTickets}</p>
                </div>

                <div className='flex flex-col items-center '>
                  <p className='text-slate-300'>Price</p>
                  <p className='text-white'>{eventData.price} <span className='inline-flex'><SiEthereum className='text-white text-sm'/></span>  </p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-slate-300'>Purchase Limit</p>
                  <p className='text-white'>{eventData.purchaseLimit}</p>
                </div>

              </div>

              
              <div className='flex flex-col items-center'>
                <p className='text-slate-300 text-lg md:text-xl'>About</p>
                <p className='text-white text-sm md:text-base'>{eventData.description}</p>
              </div>

              <div className='w-full h-[3px] bg-red-500 rounded-2xl'/>

              <h3 className='text-white text-2xl md:text-3xl font-light text-center'>Buy Tickets</h3>

              <div className='flex flex-col md:flex-row justify-center items-center space-y-3 md:space-x-10 md:space-y-0'>
                
                <div className='flex flex-col items-center space-y-2'>
                  <p className='text-slate-300 text-lg md:text-xl'>Number of Tickets</p>
                  <input type='number' min='1' max={ticketsPurchased ? eventData.purchaseLimit - ticketsPurchased : eventData.purchaseLimit} step='1' value={tickets} onChange={(e)=>setTickets(e.target.value)} className='bg-transparent text-white text-lg text-center border-2 border-red-500 rounded-xl px-2 py-1 w-[70px] outline-none'/>
                  <p className='text-slate-300 text-lg md:text-xl'>Total: {tickets * eventData.price} <span className='inline-flex'> <SiEthereum className='text-white text-sm'/></span> </p>
                </div>

                <button className='w-[250px] button-style'
                  onClick={() => handleBuy(tickets)}
                  disabled={eventData.purchaseLimit <= ticketsPurchased || !eventData.isSaleEnabled}
                >
                  {isLoading && <BiLoaderAlt className='text-white text-lg animate-spin'/>}
                  {!eventData.isSaleEnabled ? 'Sale not enabled' : buttonText}
                </button>

              </div>

              {ticketsPurchased > 0 && (
                <div className='flex flex-col items-center'>
                  <p className='text-white text-sm'>You own {ticketsPurchased} tickets for this event</p>
                  {eventData.purchaseLimit <= ticketsPurchased && (
                    <p className='text-white font-bold text-decoration-line: underline'>You have reached the purchase limit</p>
                  )}
              </div>
              )}
            
            </div> 
          </div>  
      ):
      (
        <Loader/>
      )
      }
      </div> 
      : <ConnectWallet/>}
    </PanelLayout>
  )
}

export default Details;