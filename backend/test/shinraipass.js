const { loadFixture,time } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require("hardhat");
const { utils } = require("ethers");

describe("shinrai contract test", () => {

    const deployContracts = async() => {

        const [shinraiAddress,owner] = await ethers.getSigners();

        const ShinraiPass = await ethers.getContractFactory('ShinraiPass');
        const shinraiPass = await ShinraiPass.deploy();
        await shinraiPass.deployed(); 
        
        const Ticket = await ethers.getContractFactory('Ticket');
        const ticket = await Ticket.deploy('concert','con','testURI','stadium',2023,6,30,utils.parseEther("0.5"),100,5,shinraiPass.address);
        await ticket.deployed(); 
        
        return [shinraiPass,ticket]; 

    }


    describe("event creation tests",() => {
               
        it("Adds a new event correctly", async() =>{
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();

            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);
            const numOfEvents = await shinraiPass.numberOfEvents();
            expect(numOfEvents).to.equal(1);
        });

    });

    describe("Contract customization functions", () => {

        const createEvent = async() => {
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();

            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);

        }

        it("changeShowName function works correctly", async () => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeShowName(0,'newName');
            const {showName} = await shinrai.showEventData(0);
            expect(showName).to.equal('newName');
        });

        it("changeDescription function works correctly", async () => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeDescription(0,'newDescription');
            const {description} = await shinrai.showEventData(0);
            expect(description).to.equal('newDescription');
        });

        it("changeDate function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeDate(0,2023,7,1);
            const date = await ticket.date(); 
            expect(date).to.equal(1688169600); //date in unix timestamp: 1/07/23
        });

        it("changeVenue function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress,owner] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeVenue(0,"newPlace");
            const venue = await ticket.venue();
            expect(venue).to.equal("newPlace");
        });

        it("changePrice function works correctly", async() =>{
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress,owner] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changePrice(0,ethers.utils.parseEther("0.1"));
            const price = await ticket.price();
            expect(price).to.equal(ethers.utils.parseEther("0.1"));
        });

        it("changeSupply function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress,owner] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSupply(0,500);
            const supply = await ticket.maxSupply();
            expect(supply).to.equal(500);
        });

        it("changeAllocationPerUser function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress,owner] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeAllocationPerUser(0,10);
            const allocation = await ticket.maxAllocationPerAddress();
            expect(allocation).to.equal(10);
        });

        it("changeSalePhase function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);

            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            const currentPhase = await ticket.isSaleEnabled();
            expect(currentPhase).to.equal(true);
        });

    });

    describe("ownerMint function tests", () => {
        const createEvent = async() => {
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();

            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);

        }

        it("only the owner can use call function", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress,addr1] = await ethers.getSigners();
            await expect(shinrai.connect(addr1).ownerMint(0,10)).to.be.reverted;
        });

        it("ownerMint function works correctly", async () => {
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).ownerMint(0,10);
            const tickets = await ticket.totalSupply();
            expect(tickets).to.be.equal(10);
        });
    });

    describe("butTicket function tests", () => {

        const createEvent = async() => {
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();

            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);

        }

        it("mint function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            await shinrai.connect(shinraiaddress).buyTicket(0,4,{value: ethers.utils.parseEther('2')});
            const totalSupply = await ticket.totalSupply();
            expect(totalSupply).to.equal(4);
        });

    });

    describe("withdrawUserFunds function tests", () => {
        
        const createEvent = async() => {
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();
            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);

        }

        it("this function can only be called by the owner of the event", async()=>{
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress,addr1] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            await shinrai.connect(addr1).buyTicket(0,4,{value: ethers.utils.parseEther('2')});
            await expect(shinrai.connect(addr1).withdrawUserFunds(0)).to.be.reverted;
        })

        it("withdrawUserFunds function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress,addr1] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            await shinrai.connect(addr1).buyTicket(0,4,{value: ethers.utils.parseEther('2')});
            const ownerPrevBalance = await shinraiaddress.getBalance();
            await shinrai.connect(shinraiaddress).withdrawUserFunds(0);
            const ownerCurrentBalance = await shinraiaddress.getBalance();
            expect(ownerCurrentBalance).to.closeTo(ownerPrevBalance.add(ethers.utils.parseEther('1.9')),ethers.utils.parseEther('0.01'));
        });

    });

    describe("withdrawShinraiPassFunds function tests", () => {
        
        const createEvent = async() => {
            const [shinraiPass, ticket] = await loadFixture(deployContracts);
            const name = await ticket.eventName();
            const venue =  await ticket.venue();
            const [year,month,day] = await ticket.getDate();
            const price = await ticket.price();
            const numOfTickets = await ticket.maxSupply();
            const ticketLimit = await ticket.maxAllocationPerAddress();
            await shinraiPass.createEvent(name,venue,'description','imageUrl',year,month,day,price,numOfTickets,ticketLimit,ticket.address);

        }

        it("this function can only be called by the owner of the event", async()=>{
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress,addr1] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            await shinrai.connect(addr1).buyTicket(0,4,{value: ethers.utils.parseEther('2')});
            await expect(shinrai.connect(addr1).withdrawShinraiPassFunds()).to.be.reverted;
        })

        it("withdrawShinraiPassFunds function works correctly", async() => {
            const [shinrai, ticket] = await loadFixture(deployContracts);
            
            await createEvent();

            const [shinraiaddress,addr1] = await ethers.getSigners();
            await shinrai.connect(shinraiaddress).changeSalePhase(0,true);
            await shinrai.connect(addr1).buyTicket(0,4,{value: ethers.utils.parseEther('2')});
            const ownerPrevBalance = await shinraiaddress.getBalance();
            await shinrai.connect(shinraiaddress).withdrawUserFunds(0);
            await shinrai.connect(shinraiaddress).withdrawShinraiPassFunds();
            const ownerCurrentBalance = await shinraiaddress.getBalance();
            expect(ownerCurrentBalance).to.closeTo(ownerPrevBalance.add(ethers.utils.parseEther('2')),ethers.utils.parseEther('0.01'));
        });
    })

});