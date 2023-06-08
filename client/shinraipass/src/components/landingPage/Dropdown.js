import React, {useState} from 'react'; 
import { motion } from 'framer-motion';

import { HiArrowSmDown } from 'react-icons/hi';

const Dropdown = ({question,answer}) => {

    const [isActive, setIsActive] = useState(false);

  return (
    <motion.div className='w-full flex flex-col border-b-2 border-black cursor-pointer overflow-y-hidden'
    initial={{height:'50px', opacity:0}} 
    whileInView={{opacity:1}} 
    animate={{ height: isActive ? 'auto' : '50px'}}  
    onClick={()=>setIsActive(!isActive)} 
    >
        
      <div className='px-5 flex justify-between items-center min-h-[50px]'>
        <p className='text-sm md:text-xl'>{question}</p>
        <HiArrowSmDown className={`text-xl ${isActive && 'rotate-180'} duration-500`}/>
      </div>

      <div className='p-5 min-h-[50px]'>
        <p className='text-sm md:text-xl'>{answer}</p>
      </div>
        
    </motion.div>
  )
}

export default Dropdown