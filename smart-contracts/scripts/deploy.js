require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const SynergyNFT = await ethers.getContractFactory('SynergyNFT');
  const baseURI = 'ipfs://';
  const priceFeedAddress = '0x001382149eBa3441043c1c66972bD537E25019e2';
  const contract = await SynergyNFT.deploy(baseURI, priceFeedAddress);
  await contract.deployed();

  console.log('SynergyNFT deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});