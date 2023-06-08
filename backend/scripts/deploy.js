const hre = require("hardhat");
const { utils } = require("ethers");

async function main() {
  

  const ShinraiPass = await ethers.getContractFactory('ShinraiPass');
  const shinraiPass = await ShinraiPass.deploy();
  await shinraiPass.deployed(); 

  //const Ticket = await ethers.getContractFactory('Ticket');
  //const ticket = await Ticket.deploy('test Concert','test','testURI','Ethereum Stadium',2023,6,25,utils.parseEther("0.1"),5000,5,shinraiPass.address);
  //await ticket.deployed(); 

  console.log(
    `contract deployed to ${shinraiPass.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
