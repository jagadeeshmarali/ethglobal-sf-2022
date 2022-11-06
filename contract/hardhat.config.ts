import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-etherscan';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/1dc931d842b449c0a674b754ee15aafd",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    matic_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
    skale: {
      url: "https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos",
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};

export default config;