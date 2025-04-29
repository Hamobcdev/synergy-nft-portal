// frontend/src/components/NFTGallery.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import CONTRACT_ABI from '../abis/SynergyNFT.json';
import { Buffer } from 'buffer';

// Polyfill buffer for browser
window.Buffer = window.Buffer || Buffer;

function NFTGallery({ userAddress }) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
  const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY || 'kJZi_A86EXSmHa6PHFLa05CdIs498hU4';
  const RPC_URL = `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

  const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY,
    network: Network.MATIC_AMOY,
  });

  const metadataURIs = {
    0: 'ipfs://QmZzrU3JdFJvpudbVpPPkbUebTQq9MwmGzcryTNTM92xX5', // Loyalty
    1: 'ipfs://QmXoR5Xy8FYS6P6WUmXuziVyUk4i87T47Ft7KD3naFD3Zd', // Supporter
    2: 'ipfs://Qmce6Cm1pfUfrc1vSN8w68PNawzUovHuGV8yV53sd5JJkq', // VIP
  };

  const ipfsToHttp = (url) => {
    if (!url || url === '') return 'https://via.placeholder.com/150';
    return url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
  };

  useEffect(() => {
    if (userAddress) {
      fetchUserNFTs();
    }
  }, [userAddress]);

  const fetchUserNFTs = async () => {
    try {
      setLoading(true);
      setError('');

      if (!userAddress) {
        throw new Error('Please connect your wallet.');
      }

      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 80002) {
        throw new Error('Please switch to Polygon Amoy testnet (Chain ID: 80002)');
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, provider);

      // Fetch NFTs using Alchemy
      const alchemyNfts = await alchemy.nft.getNftsForOwner(userAddress, {
        contractAddresses: [CONTRACT_ADDRESS],
      });
      console.log('Alchemy NFTs:', JSON.stringify(alchemyNfts.ownedNfts, null, 2));

      // Map Alchemy NFTs to display format
      const nftList = await Promise.all(
        alchemyNfts.ownedNfts.map(async (nft) => {
          const tokenId = Number(nft.tokenId);
          let tokenURI;
          let nftType;
          try {
            tokenURI = await contract.tokenURI(tokenId);
            nftType = Number(await contract.nftTypeToTokenId(tokenId));
            console.log(`Token ${tokenId}: tokenURI=${tokenURI}, nftType=${nftType}`);
          } catch (err) {
            console.warn(`Failed to fetch metadata for token ${tokenId}:`, err);
            tokenURI = metadataURIs[nftType] || '';
            nftType = tokenId === 1 || tokenId === 2 ? 0 : tokenId === 3 || tokenId === 4 || tokenId === 5 ? 1 : 2;
          }

          // Fetch metadata manually if tokenURI is valid
          let metadata = {};
          if (tokenURI) {
            try {
              const response = await fetch(ipfsToHttp(tokenURI));
              metadata = await response.json();
              console.log(`Metadata for token ${tokenId}:`, metadata);
            } catch (fetchErr) {
              console.warn(`Failed to fetch IPFS metadata for token ${tokenId}:`, fetchErr);
            }
          }

          return {
            id: tokenId.toString(),
            name: metadata.name || `Synergy NFT #${tokenId}`,
            type: ['Loyalty', 'Supporter', 'VIP', 'Custom'][nftType] || 'Unknown',
            description: metadata.description || `A ${['Loyalty', 'Supporter', 'VIP', 'Custom'][nftType] || 'Unknown'} NFT for Synergy Blockchain Pacific.`,
            image: metadata.image ? ipfsToHttp(metadata.image) : ipfsToHttp(tokenURI),
          };
        })
      );

      setNfts(nftList);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setError(`Failed to load NFTs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="nft-gallery">
        <img src="/src/assets/nft4.png" alt="Synergy NFT Logo" className="logo" />
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your NFTs...</div>;
  }

  return (
    <div className="nft-gallery">
      <img src="/src/assets/nft4.png" alt="Synergy NFT Logo" className="logo" />
      <h2>Your Synergy NFTs</h2>
      {nfts.length === 0 ? (
        <p>You don't have any Synergy NFTs yet. Mint one above!</p>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card">
              <img src={nft.image} alt={nft.name} onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} />
              <div className="nft-card-content">
                <h3>{nft.name}</h3>
                <span className="nft-type">{nft.type}</span>
                <p>{nft.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NFTGallery;