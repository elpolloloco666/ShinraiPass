import React, {useState} from 'react';
import { motion } from 'framer-motion';

const FooterButton = ({text,url,lastOne}) => {

    const [isOnTop,setIsOnTop] = useState(false);
    
    const btnBackground = {
        hidden:{scaleY:0},
        hover:{
            scaleY:1,
            transition: {
                duration: 0.3
            }
        }
    }

  return (
    <a href={url} target="_blank" className={`relative group w-full py-5 md:py-10 border-t-2 ${lastOne && 'border-b-2'} border-gray-500`}
        onMouseEnter={()=>setIsOnTop(true)}
        onMouseLeave={()=>setIsOnTop(false)}
    >
        <span className='relative z-10 text-white text-2xl md:text-5xl px-6 md:px-12 group-hover:text-black duration-500 '>{text}</span>
        <motion.div variants={btnBackground} initial='hidden' animate={isOnTop ? 'hover' : 'hidden'}  className='bg-gray-200 w-full h-full absolute top-0'/>
    </a>
  )
}

export default FooterButton