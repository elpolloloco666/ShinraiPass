import React from 'react'; 
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { buttonAnimation } from '@/utils/framerTransitions';

import { BsArrowUpRight } from 'react-icons/bs';

const PanelButton = ({text,url,delay}) => {

    const router = useRouter();

    const btnBackground = {
      hidden:{scale:0},
      hover:{scale:1}
    }

  return (
    <motion.div viewport={{ once: true }} variants={buttonAnimation(delay)} initial='hidden' whileInView='visible' whileHover='hover' className='relative group flex flex-col justify-center items-center w-[120px] h-[120px] border-2 border-white rounded-full cursor-pointer'
        onClick={()=>router.push(url)}
    >
        <BsArrowUpRight className='text-white text-2xl group-hover:text-black duration-500'/>
        <p className='text-white text-sm group-hover:text-black duration-500'>{text}</p>
        <motion.div variants={btnBackground}  className='bg-white w-full h-full rounded-full absolute -z-10 top-0'/>
    </motion.div>
  )
}

export default PanelButton