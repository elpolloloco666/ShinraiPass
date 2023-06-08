import React from 'react'; 
import { useRouter } from 'next/router';

const EditCard = ({id,showName,venue,year,month,day,price,image}) => {

    const router = useRouter();
  
    const handleClick = () => {
      router.push({
        pathname: '/dashboard/editEvent',
        query: {
          id: id,
        }
      })
    }
  
    return (
      <div className='group flex flex-col p-3 rounded-2xl space-y-4 bg-[#1a1a1a] w-[250px] h-[270px] cursor-pointer  hover:shadow-md hover:shadow-white duration-500'
      onClick={handleClick}>
          <div className='w-full h-[150px] overflow-hidden rounded-2xl'>
          <img src={image} alt={showName} className='object-cover w-full h-full group-hover:scale-110 duration-500'/>
          </div>
          <p className='text-white text-xl font-light'>{showName}</p>
          <div className='flex justify-between items-center'>
              <p className='text-slate-500 text-sm font-light'>{year}/{month}/{day}</p>
              <p className='text-slate-500 text-sm font-light'>{venue}</p>
          </div>
      </div>   
    )
}
  

export default EditCard;