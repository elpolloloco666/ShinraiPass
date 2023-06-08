import React from 'react';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import { motion } from 'framer-motion';

const PanelLayout = ({children,hideTabBar}) => {
  return (
    <div className='flex justify-center '>

      <motion.div className='absolute z-20 top-0 right-0 w-[100vw] h-[100vh] bg-black'
        initial={{x:0}}
        animate={{x:'-100%',transition: { duration: 1, ease: "circOut" }}}
        exit={{x:0,transition: { duration: 1, ease: "circIn" }}}
      />

      <div className='hidden lg:flex fixed top-0 left-0 z-20 h-[100vh]'>
        <Sidebar/> 
      </div>

      <div className={`lg:hidden ${hideTabBar && 'hidden'} fixed bottom-0 z-20 w-[100vw]`}>
        <TabBar/>
      </div>
          
      <div className='flex justify-center w-full md:py-[30px] lg:px-[200px]'>
        {children}
      </div>
    </div>
  )
}

export default PanelLayout