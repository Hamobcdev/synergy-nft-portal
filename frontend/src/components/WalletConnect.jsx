import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ setIsConnected, setAddress }) {
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setError('Please install MetaMask!');
        return;
      }
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
    } catch (err) {
      console.error('Error checking wallet connection:', err);
      setError(`Wallet connection error: ${err.message}`);
    }
  };

  const connectWallet = async () => {
    if (isConnecting) return;
    try {
      setIsConnecting(true);
      setError('');
      const { ethereum } = window;
      if (!ethereum) {
        setError('Please install MetaMask!');
        return;
      }
      const connectPromise = ethereum.request({ method: 'eth_requestAccounts' });
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection request timed out')), 15000);
      });
      const accounts = await Promise.race([connectPromise, timeoutPromise]);
      console.log('Connected account:', accounts[0]);
      setAddress(accounts[0]);
      setIsConnected(true);
      setButtonText('Wallet Connected');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      let errorMessage = err.message;
      if (err.message.includes('timed out')) errorMessage = 'Connection timed out. Please try again.';
      if (err.code === 4001) errorMessage = 'Please connect your wallet to continue.';
      if (err.code === -32002) errorMessage = 'MetaMask request pending. Please check MetaMask.';
      setError(`Failed to connect wallet: ${errorMessage}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="wallet-connect">
      <button
        className="wallet-connect-button"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : buttonText}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default WalletConnect;