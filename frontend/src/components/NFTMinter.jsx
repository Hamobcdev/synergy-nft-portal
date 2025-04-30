import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CONTRACT_ABI from '../abis/SynergyNFT.json';
import './NFTMinter.css';

function NFTMinter({ userAddress }) {
  const [nftType, setNftType] = useState('0');
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [txHash, setTxHash] = useState('');
  const [nftCounts, setNftCounts] = useState({ 0: 0, 1: 0, 2: 0 });
  const [userBalance, setUserBalance] = useState(0);

  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
  const RPC_URL = 'https://rpc-amoy.polygon.technology/';

  const metadataURIs = [
    'ipfs://QmZzrU3JdFJvpudbVpPPkbUebTQq9MwmGzcryTNTM92xX5',
    'ipfs://QmXoR5Xy8FYS6P6WUmXuziVyUk4i87T47Ft7KD3naFD3Zd',
    'ipfs://Qmce6Cm1pfUfrc1vSN8w68PNawzUovHuGV8yV53sd5JJkq',
  ];

  const nftPrices = {
    0: ethers.utils.parseEther('0.5'), // Loyalty
    1: ethers.utils.parseEther('0.75'), // Supporter
    2: ethers.utils.parseEther('1'), // VIP
  };

  const fetchNftCounts = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, provider);
      const counts = {};
      for (let i = 0; i < 3; i++) {
        counts[i] = Number(await nftContract.getNftTypeCount(i));
      }
      setNftCounts(counts);
      if (userAddress) {
        const balance = Number(await nftContract.balanceOf(userAddress));
        setUserBalance(balance);
        console.log('User NFT balance:', balance);
      }
    } catch (err) {
      console.error('Error fetching NFT counts:', err);
      setError('Failed to fetch NFT counts: ' + err.message);
    }
  };

  useEffect(() => {
    fetchNftCounts();
    const { ethereum } = window;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setError('MetaMask disconnected');
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [userAddress]);

  const mintNFT = async () => {
    try {
      setMinting(true);
      setError('');
      setSuccess('');

      const { ethereum } = window;
      if (!ethereum) throw new Error('Please install MetaMask!');
      if (!userAddress) throw new Error('Please connect your wallet.');

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      console.log('Network chainId:', Number(network.chainId));
      if (Number(network.chainId) !== 80002) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13882' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13882',
                  chainName: 'Polygon Amoy',
                  rpcUrls: ['https://rpc-amoy.polygon.technology/'],
                  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                  blockExplorerUrls: ['https://amoy.polygonscan.com/'],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      const balance = await provider.getBalance(userAddress);
      const requiredValue = nftPrices[nftType];
      console.log('Balance:', ethers.utils.formatEther(balance), 'Required:', ethers.utils.formatEther(requiredValue));
      if (balance < requiredValue) {
        throw new Error(`Insufficient MATIC: Need ${ethers.utils.formatEther(requiredValue)} MATIC`);
      }

      if (!['0', '1', '2'].includes(nftType)) {
        throw new Error('Invalid NFT type');
      }

      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
      const tokenURI = metadataURIs[parseInt(nftType)];
      console.log('Minting NFT with:', { userAddress, tokenURI, nftType });

      // Check contract state
      const userBalanceBefore = Number(await nftContract.balanceOf(userAddress));
      const typeCountBefore = Number(await nftContract.getNftTypeCount(parseInt(nftType)));
      console.log('Before mint:', { userBalanceBefore, typeCountBefore });

      const tx = await nftContract.mintNFT(userAddress, tokenURI, parseInt(nftType), {
        value: requiredValue,
        gasLimit: 500000,
      });
      setTxHash(tx.hash);
      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);
      if (receipt.status === 0) {
        throw new Error('Transaction failed. Check Polygonscan for details.');
      }
      const tokenId = Number(receipt.logs.find(log => {
        try {
          const parsedLog = nftContract.interface.parseLog(log);
          return parsedLog.name === 'NFTMinted';
        } catch (e) {
          return false;
        }
      }).args.tokenId);
      console.log('Transaction confirmed, tokenId:', tokenId);

      setSuccess(`NFT #${tokenId} minted successfully!`);
      fetchNftCounts();
    } catch (err) {
      console.error('Minting error:', err);
      let errorMessage = err.message;
      if (err.code === 4001) errorMessage = 'Transaction rejected by user';
      else if (err.code === -32002) errorMessage = 'MetaMask request pending. Please check MetaMask.';
      else if (err.reason) errorMessage = `Transaction failed: ${err.reason}`;
      else if (err.data?.message) errorMessage = `Contract error: ${err.data.message}`;
      else if (err.error?.data) {
        try {
          const iface = new ethers.utils.Interface(CONTRACT_ABI.abi);
          const decodedError = iface.parseError(err.error.data);
          errorMessage = `Contract revert: ${decodedError.name} (${decodedError.args.join(', ')})`;
        } catch (decodeErr) {
          errorMessage = `Contract revert: Unknown reason (data: ${err.error.data})`;
        }
      }
      setError(`Error minting NFT: ${errorMessage}`);
      console.log('Full error object:', JSON.stringify(err, null, 2));
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="nft-minter">
      <img src="/src/assets/nft4.png" alt="Synergy NFT Logo" className="logo" />
      <h2>Mint Your Synergy NFT</h2>
      <p>Price: {ethers.utils.formatEther(nftPrices[nftType])} MATIC</p>
      <p>Your NFT Balance: {userBalance}</p>
      <div className="form-group">
        <label>Select NFT Type:</label>
        <select value={nftType} onChange={(e) => setNftType(e.target.value)} disabled={minting}>
          <option value="0">Loyalty NFT (0.5 MATIC)</option>
          <option value="1">Supporter NFT (0.75 MATIC)</option>
          <option value="2">VIP NFT (1 MATIC)</option>
        </select>
      </div>
      <div>
        <p>Loyalty NFTs Minted: {nftCounts[0]}</p>
        <p>Supporter NFTs Minted: {nftCounts[1]}</p>
        <p>VIP NFTs Minted: {nftCounts[2]}</p>
      </div>
      <button
        className="mint-button"
        onClick={mintNFT}
        disabled={minting || !userAddress}
      >
        {minting ? (
          <span className="spinner">Minting...</span>
        ) : (
          'Mint NFT'
        )}
      </button>
      {success && (
        <div className="success-message">
          {success}{' '}
          <a href={`https://amoy.polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View on Polygonscan
          </a>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default NFTMinter;
