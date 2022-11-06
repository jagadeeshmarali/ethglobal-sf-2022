import { ethers } from "hardhat";
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const rentMarketplace = await ethers.getContractFactory("Marketplace");
  const rm = await rentMarketplace.deploy(1000, process.env.FEE_RECEPEINT);
  await rm.deployed();

  const rentableFactory = await ethers.getContractFactory("RentableNftFactory");
  const rf = await rentableFactory.deploy(rm.address, 1000000000, process.env.FEE_RECEPEINT);

  await rf.deployed();
  console.log("The Marketplace Contract is Deployed to:", rm.address);
  console.log('The Rentable Contract is deployed to:', rf.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
