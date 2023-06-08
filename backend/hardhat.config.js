require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY; 
const alchemyApiKey = process.env.ALCHEMY_API_KEY; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`, 
      accounts: [
        privateKey,
      ]
    },
  }
};
