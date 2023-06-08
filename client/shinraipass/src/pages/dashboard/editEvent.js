import React, {useState, useEffect} from 'react'; 
import PanelLayout from '@/components/PanelLayout';
import Loader from '@/components/Loader';
import ConnectWallet from '@/components/ConnectWallet';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context';
import { uploadImage } from '../api/contractTicketDeployer';
import { motion} from 'framer-motion';
import { ethers } from 'ethers';

import { MdKeyboardArrowLeft } from 'react-icons/md';

const editEvent = () => {

  const router = useRouter(); 
  const {id} = router.query;

  const {currentAccount ,getEvent, editEventField, editMetadata, editDate, ownerMint, withdraw } = useStateContext();

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
    image: '', 
    owner: '' 
  });

  const [isDisabled,setIsDisabled] = useState({
    showName: true,
    venue: true,
    description: true,
    date: true, 
    price: true,
    numberOfTickets: true,
    purchaseLimit: true,
    image: true, 
    isSaleEnabled: false
  });

  const [imageFile,setImageFile] = useState();
  const [buttonText,setButtonText] = useState('Submit Changes');
  const [isUpdatingSaleState, setIsUpdatingSaleState] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [tickets,setTickets] = useState(1);

  const handleEnableField = (fieldName) => {
    setIsDisabled(prev => {
      const updatedState = { ...prev };

      for (const key in updatedState) {
        if (key !== fieldName) {
        updatedState[key] = true;
        }
      }
      updatedState[fieldName] = !prev[fieldName];

      return updatedState;
    })
  }

  const handleFormChange = (fieldName,e) => {
    setEventData(prev => ({
        ...prev,
        [fieldName]: e.target.value
    }))
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

  const handleImageChange = (e) => {
    setEventData(prev => ({
        ...prev,
        image: e.target.value
    }));
    setImageFile(e.target.files[0]);
  }

  const getData = async() => {
    const data = await getEvent(id);
    setEventData(data);
  }
 
  const submitChange = async(field,value) => {
    setButtonText('Updating...');
    await editEventField(field,id,value);
    setButtonText('Field updated!');
    setTimeout(()=>{
      router.reload();
    },1500);
  }

  const submitMetadataChange = async() => {
    setButtonText('Updating...');
    const {url, imageUrl} = await uploadImage(imageFile,eventData.showName,eventData.description); 
    await editMetadata(id,url,imageUrl);
    setButtonText('Field updated!');
    setTimeout(()=>{
      router.reload();
    },1500);
  }

  const submitDateChange = async() => {
    setButtonText('Updating...');
    await editDate(id,eventData.year,eventData.month,eventData.day);
    setButtonText('Field updated!');
    setTimeout(()=>{
      router.reload();
    },1500);
  }

  const changeSaleState = async() => {
    setIsUpdatingSaleState(true);
    await editEventField('changeSalePhase',id,!eventData.isSaleEnabled);
    setEventData(prev =>({
      ...prev, 
      isSaleEnabled: !eventData.isSaleEnabled,
    }))
    setIsUpdatingSaleState(false);
  }

  const mintTickets = async() => {
    setIsMinting(true); 
    await ownerMint(id,tickets);
    setIsMinting(false);
  }

  const withdrawEarnings = async() => {
    setIsWithdrawing(true);
    await withdraw(id);
    setIsWithdrawing(false);
  }

  useEffect(()=> {
    if(currentAccount){
      if(id){
        getData();
      }
    }
  },[currentAccount,id]);

  useEffect(()=>{
    if(eventData.owner && currentAccount) {
      if(eventData.owner.toLocaleLowerCase() !== currentAccount){
        alert('You are not the owner of this event');
        router.push('/dashboard/');
      }
    }
  },[eventData]);

  
  return (
    <PanelLayout hideTabBar={true}>
    {currentAccount ?
    <div className='flex justify-center md:my-10 md:mx-10 lg:m-0'>
    {eventData ? (
        <div className='absolute z-10 md:relative md:z-0 flex flex-col justify-center md:justify-start space-y-6 md:bg-[#1f1f23] w-full md:w-[600px] px-3 pt-3 pb-[50px] md:py-6 md:px-10 md:rounded-2xl'>               
                <div onClick={()=>{router.back()}} className='lg:hidden bg-slate-500 rounded-full w-[50px] h-[50px] flex justify-center items-center'><MdKeyboardArrowLeft className='text-black text-[30px]'/></div>
                <p className='text-white font-light text-3xl text-center'>Edit Event</p>
                <p className='text-slate-500 font-light text-base text-center'>Click on edit, change the field value and submit your changes. Super easy!</p>

                <form onSubmit={(e)=>{e.preventDefault()}} className='flex flex-col space-y-7 justify-center'>

                  <div className='flex flex-col items-center justify-center space-y-2'>

                    <p className='text-slate-300'>
                      {eventData.isSaleEnabled && !isUpdatingSaleState && 'Disable Sale'}
                      {!eventData.isSaleEnabled && !isUpdatingSaleState && 'Enable Sale'}
                      {isUpdatingSaleState && 'Updating...'}
                    </p>
                    <div className={`flex ${eventData.isSaleEnabled ? 'justify-end' : 'justify-start'} w-[70px] px-2 py-1 rounded-full border-2 border-white ${eventData.isSaleEnabled ? 'bg-green-500' : 'bg-red-500'} duration-300 ease-in-out`}
                      onClick={()=>{changeSaleState()}}
                    >
                      <motion.div layout className='bg-white w-[20px] h-[20px] rounded-full'/>
                    </div>

                  </div>

                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('showName')}
                    >Edit</button>  

                    <div className='group relative flex w-full'>
                      <input type='text' id='show-name' required disabled={isDisabled.showName} value={eventData.showName} onChange={(e)=>handleFormChange('showName',e)} className='input-text'/>
                      <label htmlFor='show-name' className={`label-input-text ${eventData.showName !== '' && 'bottom-8 text-sm text-white'}`}>Show Name</label>
                    </div>

                    <button type='button' disabled={isDisabled.showName} className='submit-button-style'
                      onClick={()=>{submitChange('changeShowName',eventData.showName)}}
                    >{buttonText}</button>  
                  </div>  

                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('venue')}
                    >Edit</button>  

                    <div className='group relative flex w-full'>
                      <input type='text' id='venue' required disabled={isDisabled.venue} value={eventData.venue} onChange={(e)=>handleFormChange('venue',e)} className='input-text'/>
                      <label htmlFor='show-name' className={`label-input-text ${eventData.venue !== '' && 'bottom-8 text-sm text-white'}`}>Venue</label>
                    </div>

                    <button type='button' disabled={isDisabled.venue} className='submit-button-style'
                      onClick={()=>{submitChange('changeVenue',eventData.venue)}}
                    >{buttonText}</button>  
                  </div>  

                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('description')}
                    >Edit</button>  

                    <div className='group relative flex w-full'>
                      <input type='text' id='venue' required disabled={isDisabled.description} value={eventData.description} onChange={(e)=>handleFormChange('description',e)} className='input-text'/>
                      <label htmlFor='show-name' className={`label-input-text ${eventData.description !== '' && 'bottom-8 text-sm text-white'}`}>Description</label>
                    </div>

                    <button type='button' disabled={isDisabled.description} className='submit-button-style'
                      onClick={()=>{submitChange('changeDescription',eventData.description)}}
                    >{buttonText}</button>  
                  </div>  
                   
                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('date')}
                    >Edit</button> 

                      <div className='group flex flex-col'>
                        <label htmlFor='date' className='label-input-number'>Date</label>
                        <input type='date' id='date' min={new Date().toISOString().split('T')[0]} required disabled={isDisabled.date} value={`${eventData.year}-${String(eventData.month).padStart(2, '0')}-${String(eventData.day).padStart(2, '0')}`} onChange={(e)=>{handleDateChange(e)}} className='text-slate-300 pl-3 bg-transparent outline-none focus:text-teal-400 duration-500 disabled:text-slate-500'/>
                      </div>

                    <button type='button' disabled={isDisabled.date} className='submit-button-style'
                      onClick={()=>{submitDateChange()}}
                    >{buttonText}</button>  
                  </div>

                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('price')}
                    >Edit</button>     

                      <div className='group flex flex-col'>
                          <label htmlFor='price' className='label-input-number'>Price</label>
                          <input type='number' id='price' min='0' step='0.01' required disabled={isDisabled.price} value={eventData.price} onChange={(e)=>handleFormChange('price',e)} className='input-number'/>
                      </div>

                    <button type='button' disabled={isDisabled.price} className='submit-button-style'
                      onClick={()=>{submitChange('changePrice',ethers.utils.parseEther(eventData.price.toString()))}}
                    >{buttonText}</button>  
                  </div>      
                    

                    
                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('numberOfTickets')}
                    >Edit</button>

                      <div className='group flex flex-col'>
                          <label htmlFor='numOfTickets' className='label-input-number'>Number of Tickets</label>
                          <input type='number' id='numOfTickets' min='1' step='1' required disabled={isDisabled.numberOfTickets} value={eventData.numberOfTickets} onChange={(e)=>handleFormChange('numberOfTickets',e)} className='input-number'/>
                      </div>

                    <button type='button' disabled={isDisabled.numberOfTickets} className='submit-button-style'
                      onClick={()=>{submitChange('changeSupply',eventData.numberOfTickets)}}
                    >{buttonText}</button>  
                  </div>  


                  <div className='flex items-center space-x-3'>
                    <button type='button' className='edit-button-style'
                      onClick={()=>handleEnableField('purchaseLimit')}
                    >Edit</button>

                      <div className='group flex flex-col'>
                          <label htmlFor='purchaseLimit' className='label-input-number'>Purchase Limit</label>
                          <input type='number' id='purchaseLimit' min='1' step='1' required disabled={isDisabled.purchaseLimit} value={eventData.purchaseLimit} onChange={(e)=>handleFormChange('purchaseLimit',e)} className='input-number'/>
                      </div>

                    <button type='button' disabled={isDisabled.purchaseLimit} className='submit-button-style'
                      onClick={()=>{submitChange('changeAllocationPerUser',eventData.purchaseLimit)}}
                    >{buttonText}</button>  
                  </div>
                    
                  <div className='flex flex-col items-center space-y-2'>
                    <label htmlFor='image' className='label-input-number'>Image</label>
                    <div className='flex items-center space-x-3'>
                      <button type='button' className='edit-button-style'
                        onClick={()=>handleEnableField('image')}
                      >Edit</button>

                      <img src={eventData.imageUrl} alt={eventData.showName} className={`w-[200px] h-[150px] rounded-xl object-cover ${!isDisabled.image && 'hidden'}`}/>
                      <input type='file' id='image' name='image-selector' accept="image/*" required value={eventData.image || ''} onChange={(e)=>handleImageChange(e)} className={`text-white text-xs ${isDisabled.image && 'hidden'}`}/>

                    </div>

                    <button type='button' disabled={isDisabled.image} className='submit-button-style'
                        onClick={()=>{submitMetadataChange()}}
                    >{buttonText}</button>  

                  </div>

            </form>

            <div className='w-full h-[3px] bg-red-500 rounded-2xl'/>

            <div className='flex flex-col justify-center items-center space-y-4'>

              <p className='text-white text-xl font-light'>Mint Tickets</p>

              <div className='flex items-center space-x-5'>
              <div className='flex flex-col items-center space-y-2'>
                  <p className='text-slate-300 text-lg'>Number of Tickets</p>
                  <input type='number' min='1' step='1' value={tickets} onChange={(e)=>setTickets(e.target.value)} className='bg-transparent text-white text-lg text-center border-2 border-red-500 rounded-xl px-2 py-1 w-[70px] outline-none'/>
              </div>

                <button className='w-[250px] button-style'
                  onClick={()=>{mintTickets()}}
                >
                  {isMinting ? 'Minting Tickets...' : 'Mint!'}
                </button>
                </div>
            </div>

            <div className='w-full h-[3px] bg-red-500 rounded-2xl'/>

            <div className='flex flex-col justify-center items-center space-y-4'>

              <p className='text-white text-xl font-light'>Withdraw earnings</p>

              <button className='w-[250px] button-style'
                  onClick={()=>{withdrawEarnings()}}
                >
                  {isWithdrawing ? 'Withdrawing...' : 'Withdraw!'}
                </button>

            </div>


          </div>

          ): (
            <Loader/>
          )}  
      </div>
      : <ConnectWallet/>}
    </PanelLayout>
  )
}

export default editEvent;