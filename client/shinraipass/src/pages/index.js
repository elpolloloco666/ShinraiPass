import React from 'react';
import Hero from '@/components/landingPage/Hero';
import Navbar from '@/components/landingPage/Navbar';
import Introduction from '@/components/landingPage/Introduction';
import FAQ from '@/components/landingPage/FAQ';
import About from '@/components/landingPage/About';
import CallToAction from '@/components/landingPage/CallToAction';
import Footer from '@/components/landingPage/Footer';
import OpenTransition from '@/components/landingPage/OpenTransition';

export default function Home() {

  return ( 
    <main>
      <OpenTransition/>
      <Navbar/>
      <Hero/>
      <Introduction/>
      <About/>
      <FAQ/>
      <CallToAction/>
      <Footer/>
    </main>
  )
}
