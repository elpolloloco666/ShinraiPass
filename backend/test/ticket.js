const { loadFixture,time } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require("hardhat");
const { utils } = require("ethers");

describe("ticket contract tests", () => {

    const deployContract = async() => {
        const [owner,shinrai] = await ethers.getSigners();
        const Ticket = await ethers.getContractFactory('Ticket');
        const ticket = await Ticket.deploy('concert','con','testURI','stadium',2023,6,30,utils.parseEther("0.5"),100,5,shinrai.address);
        await ticket.deployed(); 
        return ticket; 
    }

    describe("State varibles are correctly assigned", () =>{

        it("the price is correctly assigned", async () => {
            const contract = await loadFixture(deployContract);
            const price = await contract.price();
            expect(price).to.equal(ethers.utils.parseEther("0.5"));
        });

        it("Max supply is correctly assigned", async() => {
            const contract = await loadFixture(deployContract);
            const maxSupply = await contract.maxSupply();
            expect(maxSupply).to.equal(100);
        });

        it("Max allocation per address correctly assigned", async() => {
            const contract = await loadFixture(deployContract);
            const maxAllocation = await contract.maxAllocationPerAddress(); 
            expect(maxAllocation).to.equal(5);
        });

        it("the date is correctly assigned", async() => {
            const contract = await loadFixture(deployContract);
            const date = await contract.date();
            expect(date).to.equal(1688083200); //date in unix timestamp: 30/06/23
        });

        it("The venue is correctly assigned", async() => {
            const contract = await loadFixture(deployContract);
            const venue = await contract.venue();
            expect(venue).to.equal("stadium");
        });

        it("The URI is correctly assigned", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).mint(1,{value: ethers.utils.parseEther('0.5')});
            const URI = await contract.tokenURI(1);
            expect(URI).to.equal("testURI");
        }); 
        
    });

    describe("Contract customization functions", () => {
        it("setMetadata working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setMetadata("test");
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).mint(1,{value: ethers.utils.parseEther('0.5')});
            const URI = await contract.tokenURI(1);
            expect(URI).to.equal("test");
        });

        it("cannot set an empty string as the new URI", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await expect(contract.connect(shinrai).setMetadata("")).to.be.reverted;
        });

        it("setDate working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setDate(2023,7,1);
            const date = await contract.date();
            expect(date).to.equal(1688169600); //date in unix timestamp: 1/07/23
        });

        it("setVenue working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setVenue("test");
            const venue = await contract.venue();
            expect(venue).to.equal("test");
        });

        it("setPrice working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setPrice(ethers.utils.parseEther("0.1"));
            const price = await contract.price();
            expect(price).to.equal(ethers.utils.parseEther("0.1"));
        });

        it("setMaxSupply working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setMaxSupply(10);
            const supply = await contract.maxSupply();
            expect(supply).to.equal(10);
        });

        it("setMaxAllocationPerUser working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setMaxAllocationPerUser(1);
            const maxAllocation = await contract.maxAllocationPerAddress();
            expect(maxAllocation).to.equal(1);
        });

        it("setSalePhase working properly", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            const salePhase = await contract.isSaleEnabled();
            expect(salePhase).to.equal(true);
        });
    });

    describe("ownerMint function tests", () => {

        it("ownerMint working properly", async() => {
            const contract = await loadFixture(deployContract); 
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).ownerMint(5);
            const totalSupply = await contract.totalSupply();
            expect(totalSupply).to.equal(5);
        });

        it("cannot mint if max supply it's reached", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setMaxSupply(1); // we change the max supply to 1
            await expect(contract.ownerMint(2)).to.be.reverted;
        });

        it("non owners cannot mint", async() => {
            const contract = await loadFixture(deployContract);
            const [,,addr1] = await ethers.getSigners();
            await expect(contract.connect(addr1).ownerMint(1)).to.be.reverted;
        })

        it("mint amount must be greater than 0", async() => {
            const contract = await loadFixture(deployContract);
            const [,shinrai] = await ethers.getSigners();
            await expect(contract.connect(shinrai).ownerMint(0)).to.be.reverted;
        });
    });

    describe("mint function tests", () => {

        it("cannot mint if sale is not enabled", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
           await expect(contract.connect(shinrai).mint(1)).to.be.reverted;
        });

        it("cannot mint if the value is wrong", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await expect(contract.connect(shinrai).mint(1, {value: ethers.utils.parseEther('0')})).to.be.reverted;
        });

        it("cannot exceed max allocation per address", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await expect(contract.connect(shinrai).mint(10, {value: ethers.utils.parseEther('5')})).to.be.reverted;
        });

        it("cannot exceed max supply", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).setMaxSupply(1);
            await expect(contract.connect(shinrai).mint(2, {value: ethers.utils.parseEther('1')})).to.be.reverted;
        });

        it("mint function works correctly", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).mint(5, {value: ethers.utils.parseEther('2.5')});
            const totalSupply = await contract.totalSupply();
            expect(totalSupply).to.be.equal(5);
        });

    });

    describe("TokenURI function tests",() => {
        
        it("the function returns the base URI for an existent token", async() => {
            const contract = await loadFixture(deployContract);
            const[,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).mint(5, {value: ethers.utils.parseEther('2.5')});
            const uri = await contract.tokenURI(1);
            expect(uri).to.equal("testURI");
        });

    });

    describe("withdrawFunds function tests", () => {
        
        it("withdrawFunds function works correctly", async() => {
            const contract = await loadFixture(deployContract);
            const[owner,shinrai] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(true);
            await contract.connect(shinrai).mint(4, {value: ethers.utils.parseEther('2')});
            const ownerPrevBalance = await owner.getBalance();
            const shinraiPrevBalance = await  shinrai.getBalance();
            await contract.connect(shinrai).withdrawFunds();
            const ownerCurrentBalance = await owner.getBalance();
            const shinraiCurrentBalance = await  shinrai.getBalance();
            expect(ownerCurrentBalance).to.closeTo( ownerPrevBalance.add(ethers.utils.parseEther('1.9')) ,ethers.utils.parseEther('0.01'));
            expect(shinraiCurrentBalance).to.closeTo( shinraiPrevBalance.add(ethers.utils.parseEther('0.1')) ,ethers.utils.parseEther('0.01'));
        
        });

        it("this function can only be called throught the shinrai contract", async() =>{
            const contract = await loadFixture(deployContract);
            const[owner,shinrai,addr1] = await ethers.getSigners();
            await contract.connect(shinrai).setSalePhase(1);
            await contract.connect(shinrai).mint(4, {value: ethers.utils.parseEther('2')});
            await expect(contract.connect(addr1).withdrawFunds()).to.be.reverted;
        });
        
    });

})