const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const SynergyNFT = await hre.ethers.getContractFactory("SynergyNFT");
  
  // Deploy the contract
  const synergyNFT = await SynergyNFT.deploy();
  await synergyNFT.waitForDeployment();
  
  // Get the contract address
  const address = await synergyNFT.getAddress();
  
  console.log("SynergyNFT deployed to:", address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });