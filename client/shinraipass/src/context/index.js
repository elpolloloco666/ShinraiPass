import React,{useState,useContext,createContext, useEffect} from "react";
import { ethers } from "ethers";
import { shinraiPassContractAddress, shinraiPassContractABI } from "@/constants";


const StateContext = createContext("");

const { ethereum } = typeof window !== "undefined" ? window : {};

const createContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(shinraiPassContractAddress,shinraiPassContractABI,signer);
    return contract; 
}


export const StateContextProvider = ({children}) =>{

    const [currentPage, setCurrentPage] = useState('');
    const [currentAccount, setCurrentAccount] = useState('');

    const getSigner = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return {signer,provider};
    }

    const connectAccount = async() => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const {provider} = getSigner();
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            if((await provider.getNetwork()).chainId !== 5) alert("Please switch to the goerli network");
            else setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyConnection = async() => {
        try {
            if (!ethereum) return;
            const {provider} = getSigner();
            const accounts = await ethereum.request({ method: "eth_accounts", });
            if(accounts.length){
                if((await provider.getNetwork()).chainId !== 5) alert("Please switch to the goerli network");
                    else setCurrentAccount(accounts[0]);   
            }else{
                   console.log('Address not found'); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getEvent = async(id) => {
        const contract = createContract();
        try {
            const event = await contract.showEventData(id)
            .then(res => ({
                id: res.id.toNumber(),
                showName: res.showName, 
                venue: res.venue,
                description: res.description,
                imageUrl: res.imageUrl,
                year: res.year.toNumber(),
                month: res.month.toNumber(),
                day: res.day.toNumber(),
                price: ethers.utils.formatEther(res.price.toString()),
                numberOfTickets: res.numberOfTickets.toNumber(), 
                purchaseLimit: res.purchaseLimit.toNumber(),
                isSaleEnabled: res.isSaleEnabled,
                eventAddress: res.eventAddress,
                owner: res.owner
            }));
            return event; 
        } catch (error) {
            
        }
    }

    const getAllEvents = async() => {
        const contract = createContract(); 
        const events = await contract.showAllEvents();
        const restructuredData = events.map(event => ({
            id: event.id.toNumber(),
            showName: event.showName, 
            venue: event.venue,
            description: event.description,
            imageUrl: event.imageUrl,
            year: event.year.toNumber(),
            month: event.month.toNumber(),
            day: event.day.toNumber(),
            price: ethers.utils.formatEther(event.price.toString()),
            numberOfTickets: event.numberOfTickets.toNumber(), 
            purchaseLimit: event.purchaseLimit.toNumber(),
            isSaleEnabled: event.isSaleEnabled,
            eventAddress: event.eventAddress,
            owner: event.owner
        }));	
        return restructuredData;                
    }

    const getTotalSupply = async(id) => {
        const contract = createContract(); 
        const numOfTickets = await contract.getEventTotalSupply(id);
        return numOfTickets.toNumber();
    } 

    const getUserEvents = async() => {
        const contract = createContract(); 
        if(currentAccount.length > 0) { 
        const events = await contract.showEventsPerDeployer(currentAccount); 
        const restructuredData = events.map(event => ({
            id: event.id.toNumber(),
            showName: event.showName, 
            venue: event.venue,
            description: event.description,
            imageUrl: event.imageUrl,
            year: event.year.toNumber(),
            month: event.month.toNumber(),
            day: event.day.toNumber(),
            price: ethers.utils.formatEther(event.price.toString()),
            numberOfTickets: event.numberOfTickets.toNumber(), 
            purchaseLimit: event.purchaseLimit.toNumber(),
            isSaleEnabled: event.isSaleEnabled,
            eventAddress: event.eventAddress,
            owner: event.owner
        }));
        return restructuredData;	
        }
    }

    const getUserTickets = async() => {
        const contract = createContract();
        if(currentAccount.length > 0){
            const tickets = await contract.showUserTickets(currentAccount);
            const restructuredData = tickets.map(item => ({
                eventId: item.eventId.toNumber(), 
                ticketId: item.ticketId.toNumber(), 
                showName: item.showName,
                venue: item.venue,
                description: item.description,
                imageUrl: item.imageUrl,
                year: item.year.toNumber(),
                month: item.month.toNumber(),
                day: item.day.toNumber(),
                price: ethers.utils.formatEther(item.price.toString()),
                owner: item.owner
            }))
            return restructuredData;
        }
    }

    const getNumberOfTicketsPurchased = async(id) => {
        const contract = createContract();
        if(currentAccount.length > 0) {
            const purchasedTickets = await contract.userEventTicketCount(currentAccount,id)
            .then(res => res.toNumber());        
            return purchasedTickets;
        }
    }


    const addEvent = async(showName,venue,description,image,year,month,day,price,numberOfTickets,purchaseLimit,eventAddress) => {
        const contract = createContract();
        const {signer,provider} = getSigner();
        try {
            const transaction = await contract.connect(signer).createEvent(showName,venue,description,image,year,month,day,ethers.utils.parseEther(price),numberOfTickets,purchaseLimit,eventAddress);
            const hash = transaction.hash;
            const receipt = await provider.waitForTransaction(hash);
            return receipt;
        } catch (error) {
            console.log(error);
        }

    }

    const editEventField = async(fieldName,id,value) => {
        const contract = createContract();
        const {signer,provider} = getSigner();
        try {
           const transaction =  await contract.connect(signer)[fieldName](id,value);
           const hash = transaction.hash; 
           const receipt = await provider.waitForTransaction(hash);
           return receipt; 
        } catch (error) {   
            console.log(error);
        }
    }

    const editMetadata = async(id,metadata,imageUrl) => {
        const contract = createContract();
        const {signer,provider} = getSigner();
        try {
           const transaction =  await contract.connect(signer).changeMetadata(id,metadata,imageUrl);
           const hash = transaction.hash; 
           const receipt = await provider.waitForTransaction(hash);
           return receipt; 
        } catch (error) {   
            console.log(error);
        }
    }

    const editDate = async(id,year,month,day) => {
        const contract = createContract();
        const {signer,provider} = getSigner();
        try {
           const transaction =  await contract.connect(signer).changeDate(id,year,month,day);
           const hash = transaction.hash; 
           const receipt = await provider.waitForTransaction(hash);
           return receipt; 
        } catch (error) {   
            console.log(error);
        }
    }
    
    const ownerMint = async(id,amount) => {
        const contract = createContract();
        const {signer,provider} = getSigner(); 
        try {
            const transaction = await contract.connect(signer).ownerMint(id,amount);
            const hash = transaction.hash; 
            const receipt = await provider.waitForTransaction(hash);
            return receipt; 
        } catch (error) {
            console.log(error);
        }
    }

    const buyTickets = async(id,amount,total) => {
        const contract = createContract();
        const {signer,provider} = getSigner(); 
        try {
            const transaction = await contract.connect(signer).buyTicket(id,amount,{value: ethers.utils.parseEther(total.toString())});
            const hash = transaction.hash; 
            const receipt = await provider.waitForTransaction(hash);
            return receipt; 
        } catch (error) {
            console.log(error);
        }
    } 

    const withdraw = async(id) => {
        const contract = createContract();
        const {signer,provider} = getSigner(); 
        try {
           const transaction = await contract.connect(signer).withdrawUserFunds(id); 
           const hash = transaction.hash; 
           const receipt = await provider.waitForTransaction(hash);
           return receipt;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
     verifyConnection();
    },[]);


    return(
        <StateContext.Provider
        value={{
            currentAccount,
            currentPage,
            connectAccount,
            getAllEvents,
            getTotalSupply,
            editEventField,
            editMetadata,
            editDate,
            setCurrentPage,
            getSigner,
            verifyConnection,
            addEvent,
            getUserEvents,
            getNumberOfTicketsPurchased,
            getUserTickets,
            getEvent,
            ownerMint,
            buyTickets,
            withdraw
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);