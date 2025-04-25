const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x557586a8c5790ab4b112779a4631b4d3b4a604a7";
  const SynergyNFT = await ethers.getContractAt("SynergyNFT", contractAddress);
  const price = await SynergyNFT.nftPrices(0);
  console.log(`Loyalty NFT Price: ${ethers.formatEther(price)} MATIC`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});