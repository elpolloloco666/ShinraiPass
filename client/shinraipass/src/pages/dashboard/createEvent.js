import PanelLayout from '@/components/PanelLayout';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ConnectWallet from '@/components/ConnectWallet';
import createEventImage from '../../../public/images/create.jpg';
import { deployContract, uploadImage } from '@/pages/api/contractTicketDeployer';
import { useStateContext } from '@/context'; 
import { useRouter } from 'next/router';
import { BiLoaderAlt } from 'react-icons/bi';
import { HiBadgeCheck } from 'react-icons/hi';

const createEvent = () => {

    const {currentAccount,getSigner, addEvent, setCurrentPage} = useStateContext();
    const router = useRouter();

    const [eventData,setEventData] = useState({
        showName: '',
        venue: '',
        description: '',
        year: 0,
        month: 0,
        day: 0, 
        price: 0,
        numberOfTickets: 0,
        purchaseLimit: 0,
        image: '' 
    });

    const [imageFile,setImageFile] = useState();

    const [buttontext, setbuttonText] = useState("Create Event");
    const [isLoading, setIsLoading] = useState(false);

    const handleFormChange = (fieldName,e) => {
        setEventData(prev => ({
            ...prev,
            [fieldName]: e.target.value
        }))
    }

    const handleImageChange = (e) => {
        setEventData(prev => ({
            ...prev,
            image: e.target.value
        }));
        setImageFile(e.target.files[0]);
    }

    const handleDateChange = (e) => {
        const date = e.target.value;
        const[year,month,day] = date.split('-');
        setEventData(prev => ({
            ...prev, 
            year,
            month, 
            day
        }))
    }

    const createContract = async() => {
        try {
            setIsLoading(true);
            setbuttonText("Uploading data to IPFS...");
            const {signer} = getSigner();
            const {url,imageUrl} = await uploadImage(imageFile,eventData.showName,eventData.description);
            setbuttonText("Transaction 1/2 ...");
            const contractAddress = await deployContract(eventData.showName,'SmrtTx',url,eventData.venue,eventData.year,eventData.month,eventData.day,eventData.price.toString(),eventData.numberOfTickets,eventData.purchaseLimit,signer);
            setbuttonText("Transaction 2/2 ...");
            await addEvent(eventData.showName,eventData.venue,eventData.description,imageUrl,eventData.year,eventData.month,eventData.day,eventData.price.toString(),eventData.numberOfTickets,eventData.purchaseLimit,contractAddress);
            setbuttonText("Event Created!");
            setIsLoading(false);
            setTimeout(()=>{
                router.push('/dashboard/myEvents')
            },1500);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setbuttonText("Something went wrong");
            setTimeout(()=>{
                router.reload();
            },1500);
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createContract();
    } 

    useEffect(()=>{
        setCurrentPage('createEvent');
    },[]);

  return (
    <PanelLayout>
        {currentAccount
        ?
        <div className='relative flex md:flex-row-reverse justify-center items-center md:h-[100vh] lg:h-auto md:my-10 md:mx-10 lg:m-0'>
            <Image src={createEventImage} alt='concert image' className='md:inline-flex w-full h-[100vh] md:w-[350px] lg:w-[500px] md:h-[700px] lg:h-[650px] lg:max-h-[650px] md:rounded-r-2xl opacity-20 md:opacity-100 object-cover'/>
            <div className='absolute z-10 md:relative md:z-0 flex flex-col justify-center md:justify-start space-y-6 md:bg-[#1f1f23] w-full md:w-[350px] lg:w-[500px] md:h-[700px] lg:h-[650px] p-3 md:py-6 md:px-10 md:rounded-l-2xl'>
                <h2 className='text-white font-light text-4xl text-center'>Create Event</h2>
                <p className='text-slate-500 font-light text-base text-center'>Fill in the information and create your event for free!</p>

                <form onSubmit={handleSubmit} className='flex flex-col space-y-7'>
                    
                    <div className='group relative'>
                        <input type='text' id='show-name' required value={eventData.showName} onChange={(e)=>handleFormChange('showName',e)} className='input-text'/>
                        <label htmlFor='show-name' className={`label-input-text ${eventData.showName !== '' && 'bottom-8 text-sm text-white'}`}>Show Name</label>
                    </div>

                    <div className='group relative'>
                        <input type='text' id='venue' required value={eventData.venue} onChange={(e)=>handleFormChange('venue',e)} className='input-text'/>
                        <label htmlFor='venue' className={`label-input-text ${eventData.venue !== '' && 'bottom-8 text-sm text-white'}`}>Venue</label>
                    </div>

                    <div className='group relative'>
                        <input type='text' id='description' required value={eventData.description} onChange={(e)=>handleFormChange('description',e)} className='input-text'/>
                        <label htmlFor='description' className={`label-input-text ${eventData.description !== '' && 'bottom-8 text-sm text-white'}`}>Description</label>
                    </div>

                    <div className='flex justify-between'>

                        <div className='group flex flex-col'>
                            <label htmlFor='date' className='label-input-number'>Date</label>
                            <input type='date' id='date' min={new Date().toISOString().split('T')[0]} required value={`${eventData.year}-${eventData.month}-${eventData.day}`} onChange={(e)=>{handleDateChange(e)}} className='text-slate-300 pl-3 bg-transparent outline-none focus:text-teal-400 duration-500'/>
                        </div>

                        <div className='group flex flex-col'>
                            <label htmlFor='price' className='label-input-number'>Price</label>
                            <input type='number' id='price' min='0' step='0.01' required value={eventData.price} onChange={(e)=>handleFormChange('price',e)} className='input-number'/>
                        </div>
                        
                    </div>

                    <div className='flex justify-between'>

                        <div className='group flex flex-col'>
                            <label htmlFor='numOfTickets' className='label-input-number'>Number of Tickets</label>
                            <input type='number' id='numOfTickets' min='1' step='1' required value={eventData.numberOfTickets} onChange={(e)=>handleFormChange('numberOfTickets',e)} className='input-number'/>
                        </div>

                        <div className='group flex flex-col'>
                            <label htmlFor='purchaseLimit' className='label-input-number'>Purchase Limit</label>
                            <input type='number' id='purchaseLimit' min='1' step='1' required value={eventData.purchaseLimit} onChange={(e)=>handleFormChange('purchaseLimit',e)} className='input-number'/>
                        </div>

                    </div>

                    <div className='flex flex-col items-center'>
                        <label htmlFor='image' className='label-input-number'>Image</label>
                        <input type='file' id='image' accept="image/*" required value={eventData.image} onChange={(e)=>handleImageChange(e)} className='text-white text-sm'/>
                    </div>

                    <button type='submit' className='flex items-center justify-center gap-2 w-full bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 hover:-translate-y-1 hover:scale-105 active:scale-95 duration-200 ease-in-out'>
                        {isLoading && <BiLoaderAlt className='text-white text-lg animate-spin'/>}
                        {buttontext === 'Event Created!' && <HiBadgeCheck className='text-white text-lg'/>}
                        {buttontext}
                    </button>
                    
                </form>
            </div>
        </div>
        : <ConnectWallet/>}
    </PanelLayout>
  )
}

export default createEvent