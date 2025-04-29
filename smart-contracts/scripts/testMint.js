// smart-contracts/scripts/testMint.js
require('dotenv').config();
const { ethers } = require('ethers');
const CONTRACT_ABI = require('../../frontend/src/abis/SynergyNFT.json');

const CONTRACT_ADDRESS = '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
const RPC_URL = 'https://rpc-amoy.polygon.technology/';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const USER_ADDRESS = '0x2c80200932c8733b09b70f9962d6302d9e6db2c5';
const TOKEN_URI = 'ipfs://QmXoR5Xy8FYS6P6WUmXuziVyUk4i87T47Ft7KD3naFD3Zd';
const NFT_TYPE = 1;
const VALUE = ethers.parseEther('0.75');

async function testMint() {
  try {
    if (!PRIVATE_KEY) throw new Error('PRIVATE_KEY not set in .env');
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, wallet);

    // Check contract state
    const balance = Number(await contract.balanceOf(USER_ADDRESS));
    const typeCount = Number(await contract.getNftTypeCount(NFT_TYPE));
    console.log('User balance:', balance, 'Type count:', typeCount);

    console.log('Sending mint transaction...');
    const tx = await contract.mintNFT(USER_ADDRESS, TOKEN_URI, NFT_TYPE, {
      value: VALUE,
      gasLimit: 500000,
    });
    console.log('Transaction hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction receipt:', receipt);
    if (receipt.status === 0) {
      throw new Error('Transaction failed. Check Polygonscan for details.');
    }
    const tokenId = Number(receipt.logs.find(log => {
      try {
        const parsedLog = contract.interface.parseLog(log);
        return parsedLog.name === 'NFTMinted';
      } catch (e) {
        return false;
      }
    }).args.tokenId);
    console.log('Minted NFT tokenId:', tokenId);
  } catch (e) {
    console.error('Minting error:', e);
    if (e.error?.data) {
      try {
        const iface = new ethers.Interface(CONTRACT_ABI.abi);
        const decodedError = iface.parseError(e.error.data);
        console.log('Revert reason:', decodedError.name, decodedError.args);
      } catch (decodeErr) {
        console.log('Failed to decode revert reason:', decodeErr);
        console.log('Raw revert data:', e.error.data);
      }
    }
  }
}

testMint();