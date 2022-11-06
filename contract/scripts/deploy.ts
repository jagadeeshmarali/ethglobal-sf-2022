import { ethers } from "hardhat";
import dotenv from 'dotenv';
dotenv.config();

async function main() {


  const rentableFactory = await ethers.getContractFactory("RentableNftFactory");
  const rf = await rentableFactory.deploy(process.env.MARKET_PLACE_ADDRESS, 1000000000, process.env.FEE_RECEPEINT);

  await rf.deployed();

  console.log('The Contract is deployed to:', rf.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
