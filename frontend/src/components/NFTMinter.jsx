import { useState } from 'react';
import { ethers } from 'ethers';
import './NFTMinter.css';

function NFTMinter({ userAddress }) {
const [nftType, setNftType] = useState('0'); // 0: Loyalty, 1: Supporter, 2: VIP
const [minting, setMinting] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

const CONTRACT_ADDRESS = '0x557586A8c5790Ab4b112779A4631b4D3b4a604a7';
const CONTRACT_ABI = [
{
inputs: [
{ internalType: 'address', name: 'recipient', type: 'address' },
{ internalType: 'string', name: 'tokenURI', type: 'string' },
{ internalType: 'uint256', name: 'nftType', type: 'uint256' }
],
name: 'mintNFT',
outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
stateMutability: 'payable',
type: 'function'
}
];

const metadataURIs = [
'ipfs://QmZzrU3JdFJvpudbVpPPkbUebTQq9MwmGzcryTNTM92xX5', // Loyalty
'ipfs://QmXoR5Xy8FYS6P6WUmXuziVyUk4i87T47Ft7KD3naFD3Zd', // Supporter
'ipfs://Qmce6Cm1pfUfrc1vSN8w68PNawzUovHuGV8yV53sd5JJkq' // VIP
];

const nftPrices = {
0: ethers.parseEther('0.5'), // Loyalty: 5 MATIC
1: ethers.parseEther('0.75'), // Supporter: 25 MATIC
2: ethers.parseEther('1') // VIP: 100 MATIC
};

const mintNFT = async () => {
try {
setMinting(true);
setError('');
setSuccess('');

const { ethereum } = window;
if (!ethereum) {
throw new Error('Please install MetaMask!');
}

const provider = new ethers.BrowserProvider(ethereum);
const signer = await provider.getSigner();
const network = await provider.getNetwork();
const chainId = network.chainId;

if (Number(chainId) !== 80002) {
throw new Error('Please switch to Polygon Amoy testnet (Chain ID: 80002)');
}

// Verify wallet balance
const balance = await provider.getBalance(userAddress);
const requiredValue = nftPrices[nftType];
if (balance < requiredValue) {
throw new Error(`Insufficient MATIC: Need ${ethers.formatEther(requiredValue)} MATIC`);
}

console.log('Minting NFT...');
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
const tokenURI = metadataURIs[parseInt(nftType)];
const tx = await nftContract.mintNFT(userAddress, tokenURI, parseInt(nftType), {
  value: requiredValue
});

await tx.wait();

setSuccess('NFT minted successfully!');
} catch (err) {
console.error('Error minting NFT:', err);
let errorMessage = err.message;
if (err.reason) {
errorMessage = `Transaction failed: ${err.reason}`;
} else if (err.data?.message) {
errorMessage = `Contract error: ${err.data.message}`;
}
setError(`Error minting NFT: ${errorMessage}`);
} finally {
setMinting(false);
}
};

return (
<div className="nft-minter">
<img src="/src/assets/nft4.png" alt="Synergy NFT Logo" className="logo" />
<h2>Mint Your Synergy NFT</h2>
<div className="form-group">
<label>Select NFT Type:</label>
<select value={nftType} onChange={(e) => setNftType(e.target.value)} disabled={minting}>
<option value="0">Loyalty NFT (0.5 MATIC)</option>
<option value="1">Supporter NFT (0.75 MATIC)</option>
<option value="2">VIP NFT (1 MATIC)</option>
</select>
</div>
<button
className="mint-button"
onClick={mintNFT}
disabled={minting || !userAddress}
>
{minting ? 'Minting...' : 'Mint NFT'}
</button>
{success && <div className="success-message">{success}</div>}
{error && <div className="error-message">{error}</div>}
</div>
);
}

export default NFTMinter;