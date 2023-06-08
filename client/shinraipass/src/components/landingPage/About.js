import React from 'react'
import AboutCard from './AboutCard';
import SectionText from './SectionText';
import eventImage from '../../../public/images/create.jpg';
import createEventImage from '../../../public/images/creation.jpg';
import technologyImage from '../../../public/images/technology.jpg'

const About = () => {
  return (
    <section id='about' className='w-[100vw] bg-[#131313] flex flex-col space-y-[50px] md:space-y-[150px] px-5 lg:px-[100px] py-[75px] md:pt-[100px] md:pb-[200px] overflow-x-hidden'>
        
        <SectionText text='ABOUT' styles='text-white text-7xl md:text-9xl'/>
        
        <AboutCard 
        image={eventImage} 
        title='Wide Range of Events' 
        description='From chart-topping concerts to thrilling music festivals, ShinraiPass offers a diverse selection of events to cater to various interests and genres. Discover your favorite artists and immerse yourself in unforgettable live experiences, all through ShinraiPass.' 
        direction='left'
        />

        <AboutCard
        image={technologyImage}
        title='Authentic and Verified Tickets'
        description='Say goodbye to counterfeit tickets and fraudulent transactions. ShinraiPass leverages blockchain technology to provide you with authentic, verified event tickets. Every ticket purchased through ShinraiPass is securely stored in your digital wallet, ensuring its legitimacy and giving you complete ownership.'
        direction='right'
        />

        <AboutCard
        image={createEventImage}
        title='Seamless Event Creation'
        description="Set up your events and effortlessly manage the entire ticketing process. It's never been easier to get your event up and running. ShinraiPass charges a minimal fee of only 5% of ticket sales. We believe in providing an affordable ticketing solution for event organizers while ensuring they maximize their earnings."
        direction='left'
        />

    </section>
  )
}

export default About