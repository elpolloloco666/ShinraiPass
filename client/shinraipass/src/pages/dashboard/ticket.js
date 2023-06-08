import PanelLayout from '@/components/PanelLayout';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import Loader from '@/components/Loader';
import ConnectWallet from '@/components/ConnectWallet';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context';

import { SiEthereum } from 'react-icons/si';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const ticket = () => {

  const [eventData, setEventData] = useState({});

  const router = useRouter(); 
  const {eventId,ticketId,owner} = router.query;

  const {currentAccount,getEvent} = useStateContext();

  const getData = async() => {
    const data = await getEvent(eventId);
    setEventData(data);
  }

  useEffect(()=>{
    if(currentAccount){
      if(eventId){
        if(currentAccount !== owner.toLocaleLowerCase()){
          alert('You are not the owner of this ticket');
          router.push('/dashboard/');
        }else getData();
      }
    }
  }, [currentAccount,eventId]);


  return (
    <PanelLayout hideTabBar={true}>
      {currentAccount?
      <div className='flex justify-center md:my-10 md:mx-10 lg:m-0'>
      {eventData ? (
          <div className='relative flex flex-col bg-[#1f1f23] md:py-5 md:px-7 rounded-2xl space-y-5 md:space-y-8 items-center'>

            <div className='relative'>
              <div onClick={()=>{router.back()}} className='lg:hidden absolute top-5 left-5 bg-black opacity-50 p-3 rounded-full'><MdKeyboardArrowLeft className='text-white text-[30px]'/></div>
              <img src={eventData.imageUrl} className='w-[100vw] h-[400px] md:w-[500px] md:h-[350px] lg:w-[600px] lg:h-[300px] object-cover md:rounded-2xl'/>
              <div className='md:hidden absolute bottom-0 w-full h-[40px] bg-gradient-to-b from-transparent to-[#1f1f23]'/>
            </div>

            <div className='absolute z-10 top-[180px] md:static bg-[#1f1f23] md:bg-transparent opacity-90 md:opacity-100 rounded-t-[40px] md:rounded-none flex flex-col w-full space-y-8 px-3 pt-6 pb-[90px] md:px-[50px] md:pt-0 md:pb-8'>

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

              <div className='grid grid-cols-2 text-sm md:text-base'>
                
                <div className='flex flex-col items-center'>
                  <p className='text-slate-300'>Ticket ID</p>
                  <p className='text-white'>{ticketId}</p>
                </div>

                <div className='flex flex-col items-center '>
                  <p className='text-slate-300'>Price</p>
                  <p className='text-white'>{eventData.price} <span className='inline-flex'><SiEthereum className='text-white text-sm'/></span>  </p>
                </div>

              </div>

              <div className='flex flex-col items-center'>
                <p className='text-slate-300 text-lg md:text-xl'>Owner</p>
                <p className='text-white text-sm md:text-base'>{owner.slice(0,5)+' ... '+owner.slice(owner.length-5,owner.length)}</p>
              </div>

              
              <div className='flex flex-col items-center'>
                <p className='text-slate-300 text-lg md:text-xl'>About</p>
                <p className='text-white text-sm md:text-base'>{eventData.description}</p>
              </div>

              <div className='w-full h-[3px] bg-red-500 rounded-2xl'/>

              <h3 className='text-white text-2xl md:text-3xl font-light text-center'>QR Code</h3>

              <div className='w-full h-[200px] flex justify-center items-center'>
                <QRCode
                style={{ height: "100%", width: "100%" }}
                bgColor='#fff'
                fgColor='#000'
                value={`https://testnets.opensea.io/assets/goerli/${eventData.eventAddress}/${ticketId}`}
                viewBox={`0 0 256 256`}
              />
              </div>
            
            </div> 

           </div> 
      ): (
        <Loader/>
      )}
      </div>
      :<ConnectWallet/>}
    </PanelLayout>
  )
}

export default ticket;