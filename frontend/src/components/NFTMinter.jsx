import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useConfig, useWalletClient, useAccount, usePublicClient } from 'wagmi';
import { getContract, parseEther, formatEther } from 'viem';
import CONTRACT_ABI from '../abis/SynergyNFT.json';
import './NFTMinter.css';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function NFTMinter({ userAddress }) {
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const publicClient = usePublicClient();
  const config = useConfig();
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState('0');
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && userAddress && publicClient) {
        try {
          const balanceWei = await publicClient.getBalance({ address: userAddress });
          const balanceEth = formatEther(balanceWei);
          setBalance(balanceEth);
        } catch (err) {
          console.error('Error fetching balance:', err);
          setError('Failed to fetch balance');
        }
      }
    };
    fetchBalance();
  }, [isConnected, userAddress, publicClient]);

  const mintNFT = async (tier) => {
    if (!isConnected || !walletClient) {
      setError('Please connect your wallet');
      return;
    }

    setMinting(true);
    setError('');
    setTransactionHash('');

    try {
      const contract = getContract({
        address: contractAddress,
        abi: CONTRACT_ABI,
        client: { wallet: walletClient, public: publicClient },
      });

      let mintFunction;
      let mintPrice;
      switch (tier) {
        case 'loyalty':
          mintFunction = contract.write.mintLoyaltyNFT;
          mintPrice = parseEther('0.01');
          break;
        case 'supporter':
          mintFunction = contract.write.mintSupporterNFT;
          mintPrice = parseEther('0.05');
          break;
        case 'vip':
          mintFunction = contract.write.mintVIPNFT;
          mintPrice = parseEther('0.1');
          break;
        default:
          throw new Error('Invalid NFT tier');
      }

      const gasEstimate = await contract.estimateGas.mintLoyaltyNFT({
        account: userAddress,
        value: mintPrice,
      });

      const { request } = await contract.simulate.mintLoyaltyNFT({
        account: userAddress,
        value: mintPrice,
      });

      const hash = await walletClient.writeTransaction(request);
      setTransactionHash(hash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status === 'success') {
        console.log(`${tier} NFT minted successfully! Transaction hash: ${hash}`);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (err) {
      console.error('Error minting NFT:', err);
      setError(`Failed to mint ${tier} NFT: ${err.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="nft-minter">
      <h2>Mint Your NFT</h2>
      <p>Wallet Balance: {balance} ETH</p>
      {isConnected ? (
        <div className="mint-buttons">
          <button
            onClick={() => mintNFT('loyalty')}
            disabled={minting}
            className="mint-button"
          >
            {minting ? 'Minting...' : 'Mint Loyalty NFT (0.01 ETH)'}
          </button>
          <button
            onClick={() => mintNFT('supporter')}
            disabled={minting}
            className="mint-button"
          >
            {minting ? 'Minting...' : 'Mint Supporter NFT (0.05 ETH)'}
          </button>
          <button
            onClick={() => mintNFT('vip')}
            disabled={minting}
            className="mint-button"
          >
            {minting ? 'Minting...' : 'Mint VIP NFT (0.1 ETH)'}
          </button>
        </div>
      ) : (
        <p>Please connect your wallet to mint NFTs</p>
      )}
      {error && <p className="error-message">{error}</p>}
      {transactionHash && (
        <p className="success-message">
          Transaction successful!{' '}
          <a
            href={`https://amoy.polygonscan.com/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on PolygonScan
          </a>
        </p>
      )}
    </div>
  );
}

export default NFTMinter;
