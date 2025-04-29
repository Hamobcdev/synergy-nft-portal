// smart-contracts/scripts/check-token-uri.js
const { ethers } = require('ethers');
const CONTRACT_ABI = require('../../frontend/src/abis/SynergyNFT.json');

const CONTRACT_ADDRESS = '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
const RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/kJZi_A86EXSmHa6PHFLa05CdIs498hU4';

async function checkTokenURI() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, provider);

    for (let tokenId = 1; tokenId <= 7; tokenId++) {
      try {
        const tokenURI = await contract.tokenURI(tokenId);
        console.log(`Token ID ${tokenId}: tokenURI=${tokenURI}`);
        // Test IPFS resolution
        const httpUrl = tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
        const response = await fetch(httpUrl);
        const metadata = await response.json();
        console.log(`Metadata for Token ID ${tokenId}:`, metadata);
      } catch (e) {
        console.error(`Error for Token ID ${tokenId}:`, e);
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

checkTokenURI();