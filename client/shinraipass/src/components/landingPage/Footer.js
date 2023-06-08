import React from 'react';
import FooterButton from './FooterButton';
const Footer = () => {

  

  return (
    <footer className='w-[100vw] bg-[#0f0f1a] flex flex-col'>
      
      <FooterButton text='Twitter' url='https://www.twitter.com'/>
      <FooterButton text='Facebook' url='https://www.facebook.com'/>
      <FooterButton text='Instagram' url='https://www.instagram.com' lastOne/>

      <p className='text-md text-white text-center pt-10 pb-5'>© 2023 ShinraiPass. all rights reserved.</p>

    </footer>
  )
}

export default Footer