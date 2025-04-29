// smart-contracts/scripts/test-balance.js
const { ethers } = require('ethers');
const CONTRACT_ABI = require('../../frontend/src/abis/SynergyNFT.json');

const CONTRACT_ADDRESS = '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
const RPC_URL = 'https://rpc-amoy.polygon.technology/';
const ADDRESSES = [
  //'0x2c80200932c8733b09b70f9962d6302d9e6db2c5',
  '0x6f9fe524f2e8058f1fbca11d18fd02d58e17d9be',
];

async function test() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, provider);

    for (const address of ADDRESSES) {
      const balance = Number(await contract.balanceOf(address));
      console.log(`Balance for ${address}: ${balance}`);
      const tokenIds = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = Number(await contract.tokenOfOwnerByIndex(address, i));
        const nftType = Number(await contract.nftTypeToTokenId(tokenId));
        tokenIds.push({ tokenId, nftType });
      }
      console.log(`Token IDs for ${address}:`, tokenIds);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

test();