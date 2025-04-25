const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x557586a8c5790ab4b112779a4631b4d3b4a604a7";
  const SynergyNFT = await ethers.getContractAt("SynergyNFT", contractAddress);
  const [signer] = await ethers.getSigners();
  const tx = await SynergyNFT.mintNFT(
    "0x2c80200932c8733b09b70f9962d6302d9e6db2c5",
    "ipfs://QmZzrU3JdFJvpudBVpPPkbUebTQq9MwmGzcryTNTM92xX5",
    0,
    { value: ethers.parseEther("0.5"), gasLimit: 500000 }
  );
  console.log("Transaction:", tx.hash);
  await tx.wait();
  console.log("Minted successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});