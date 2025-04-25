import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ setIsConnected, setAddress }) {
const [buttonText, setButtonText] = useState('Connect Wallet');
const [isConnecting, setIsConnecting] = useState(false);

useEffect(() => {
// Check if wallet is already connected
checkIfWalletIsConnected();
}, []);

const checkIfWalletIsConnected = async () => {
try {
const { ethereum } = window;
if (!ethereum) {
console.log('Make sure you have MetaMask installed!');
return;
}
// Check if we're authorized to access the user's wallet
const accounts = await ethereum.request({ method: 'eth_accounts' });
if (accounts.length !== 0) {
const account = accounts[0];
console.log('Found an authorized account:', account);
setAddress(account);
setIsConnected(true);
setButtonText('Wallet Connected');
} else {
console.log('No authorized account found');
}
} catch (error) {
console.log("Error checking wallet connection:", error);
}
};

const connectWallet = async () => {
if (isConnecting) return;
try {
setIsConnecting(true);
const { ethereum } = window;
if (!ethereum) {
alert('Please install MetaMask to use this app!');
return;
}
// Set a timeout to prevent hanging
const connectPromise = ethereum.request({
method: 'eth_requestAccounts'
});
// Add a timeout
const timeoutPromise = new Promise((_, reject) => {
setTimeout(() => reject(new Error('Connection request timed out')), 15000);
});
// Race the connection against the timeout
const accounts = await Promise.race([connectPromise, timeoutPromise]);
console.log('Connected', accounts[0]);
setAddress(accounts[0]);
setIsConnected(true);
setButtonText('Wallet Connected');
} catch (error) {
console.log("Error connecting wallet:", error);
if (error.message.includes('timed out')) {
alert('Connection timed out. Please try again.');
} else if (error.code === 4001) {
// User rejected request
alert('Please connect your wallet to continue.');
} else {
alert('Error connecting wallet. Please try again.');
}
} finally {
setIsConnecting(false);
}
};

return (
<button
className="wallet-connect-button"
onClick={connectWallet}
disabled={isConnecting}
>
{isConnecting ? 'Connecting...' : buttonText}
</button>
);
}

export default WalletConnect;