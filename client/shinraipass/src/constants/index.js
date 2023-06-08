import ShinraiPassArtifact from './ShinraiPass.json';
import TicketArtifact from './Ticket.json';

const shinraiPassContractABI = ShinraiPassArtifact.abi;  
const shinraiPassContractAddress = '0x0e0c69928f86983c270Bb6D9dace5fEd374Eaf7C'; 

const ticketABI = TicketArtifact.abi; 
const ticketBytecode = TicketArtifact.bytecode; 

export {shinraiPassContractAddress,shinraiPassContractABI,ticketABI,ticketBytecode}; 