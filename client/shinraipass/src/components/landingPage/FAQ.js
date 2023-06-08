import React from 'react';
import Dropdown from './Dropdown';

import SectionText from './SectionText';

const FAQ = () => {


  return (
    <section  id='faq' className='w-[100vw] bg-white flex flex-col space-y-[50px] md:space-y-[150px] px-5 md:px-[100px] py-[75px] md:pt-[100px] md:pb-[200px] overflow-x-hidden'>
        <SectionText text='FAQ' styles='text-black text-7xl md:text-9xl text-start'/>

        <div className='flex flex-col items-center space-y-5 w-full'>
            <Dropdown question='What do I need to use ShinraiPass?' answer='To use ShinraiPass, you will need a digital wallet that supports Ethereum and NFTs. We recommend using MetaMask, a popular and user-friendly digital wallet. Ensure you have a compatible wallet set up before purchasing tickets on ShinraiPass.'/>
            <Dropdown question='How to set up a digital wallet?' answer='We recommend you use MetaMask, a popular and user-friendly digital wallet for storing cryptocurrencies and NFTs. To set up MetaMask, visit metamask.io and follow these simple steps: Install the MetaMask extension for your preferred web browser, create a new wallet, securely store your password and recovery phrase, add Ethereum to your wallet by purchasing it from a reputable cryptocurrency exchange, and finally, connect your MetaMask wallet to ShinraiPass by clicking on the MetaMask icon and authorizing the connection when prompted. MetaMask provides comprehensive guides and tutorials on their website to assist you further in setting up and managing your digital wallet.'/>
            <Dropdown question='What currencies are supported for purchasing tickets?' answer='ShinraiPass currently supports Ethereum (ETH) as the primary cryptocurrency for purchasing NFT tickets. Ensure you have sufficient ETH in your connected wallet to complete your ticket purchases. We may expand our supported cryptocurrencies in the future to provide more options for our users.'/>
            <Dropdown question='How does ShinraiPass ensure the authenticity of the tickets?' answer="ShinraiPass ensures the authenticity of tickets by utilizing ERC-721 tokens, a standard on the Ethereum blockchain. Unlike traditional printed tickets or digital tickets that can be easily falsified, ERC-721 tokens are unique and cannot be replicated or tampered with. Each ticket is securely minted as an NFT (Non-Fungible Token), providing a transparent and verifiable record of ownership. By leveraging the blockchain's immutability and decentralized nature, ShinraiPass guarantees that the tickets you purchase are genuine, eliminating the risk of counterfeit tickets."/>
            <Dropdown question='How do I access my ticket on event day?' answer="Your ticket will be securely stored in your digital wallet. Simply present your wallet and the associated NFT ticket at the event entrance, where it will be scanned and verified for entry. It's that simple and convenient!"/>
            <Dropdown question='How can I resell my ticket?' answer='ShinraiPass makes it easy to resell your tickets. Simply list your ticket on popular secondary markets like OpenSea, where interested buyers can purchase them from you. Enjoy the flexibility to transfer or sell your tickets if your plans change.'/>
            <Dropdown question='How do event organizers benefit from using ShinraiPass?' answer='ShinraiPass offers event organizers a user-friendly dashboard to create and manage events effortlessly completely free, ShinraiPass charges only a 5% fee on ticket sales, allowing organizers to maximize their earnings and allocate resources to creating exceptional event experience'/>
            <Dropdown question='Can I use ShinraiPass for different types of events?' answer="Absolutely! ShinraiPass caters to a wide range of events, including concerts, music festivals, art exhibitions, conferences, and more. Whether you're organizing a small intimate gathering or a large-scale event, ShinraiPass provides a robust ticketing solution tailored to your needs."/>
        </div>

    </section>
  )
}

export default FAQ;