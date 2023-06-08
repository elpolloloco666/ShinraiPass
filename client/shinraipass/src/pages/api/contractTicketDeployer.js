import { ethers } from "ethers";
import { NFTStorage, File } from 'nft.storage';
import { ticketABI,ticketBytecode,shinraiPassContractAddress } from "@/constants";



export const uploadImage = async(imageFile,showName,description) => {
    const image = new File([imageFile],showName,{type: imageFile.type}); 
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
    const {ipnft,url} = await nftstorage.store({
        image,
        name:showName + ' - ShinraiPass', 
        description,
    });
    const metadata = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    
    const imageUrl = await fetch(metadata).then(res => res.json()).then(result => `https://ipfs.io/ipfs/${result.image.slice(7)}`);
    
    return {
        url,
        imageUrl
    }
}


export const deployContract = async(showName,symbol,metadata,venue,year,month,day,price,maxSupply,allocationPerUser,signer) => {
    
    const TicketContract = new ethers.ContractFactory(ticketABI,ticketBytecode);
    const ticketContract = await TicketContract.connect(signer).deploy(showName,symbol,metadata,venue,year,month,day,ethers.utils.parseEther(price),maxSupply,allocationPerUser,shinraiPassContractAddress);
    await ticketContract.deployed(); 
    return ticketContract.address;
}