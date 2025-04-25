import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { Buffer } from 'buffer';

// Polyfill buffer for browser
window.Buffer = window.Buffer || Buffer;

function NFTGallery({ userAddress }) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const CONTRACT_ADDRESS = '0x557586A8c5790Ab4b112779A4631b4D3b4a604a7';
  const CONTRACT_ABI = [
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'getUserNFTs',
      outputs: [
        { internalType: 'uint256[]', name: '', type: 'uint256[]' },
        { internalType: 'string[]', name: '', type: 'string[]' },
        { internalType: 'uint256[]', name: '', type: 'uint256[]' }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY || 'kJZi_A86EXSmHa6PHFLa05CdIs498hU4';
  console.log('Alchemy API Key:', alchemyApiKey);

  const alchemy = new Alchemy({
    apiKey: alchemyApiKey,
    network: Network.MATIC_AMOY
  });

  useEffect(() => {
    if (userAddress) {
      fetchUserNFTs();
    }
  }, [userAddress]);

  const fetchUserNFTs = async () => {
    try {
      setLoading(true);
      setError('');

      const { ethereum } = window;
      if (!ethereum) {
        throw new Error('Please install MetaMask!');
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const network = await provider.getNetwork();
      const chainId = network.chainId;

      if (Number(chainId) !== 80002) {
        throw new Error('Please switch to Polygon Amoy testnet (Chain ID: 80002)');
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const [tokenIds, tokenURIs, nftTypes] = await contract.getUserNFTs(userAddress);

      const alchemyNfts = await alchemy.nft.getNftsForOwner(userAddress, {
        contractAddresses: [CONTRACT_ADDRESS]
      });
      console.log('Alchemy NFTs:', alchemyNfts);

      const nftList = tokenIds.map((id, index) => ({
        id: id.toString(),
        name: `Synergy NFT #${id}`,
        type: ['Loyalty', 'Supporter', 'VIP'][nftTypes[index]],
        description: `A ${['Loyalty', 'Supporter', 'VIP'][nftTypes[index]]} NFT for Synergy Blockchain Pacific.`,
        image: tokenURIs[index] || 'https://via.placeholder.com/150'
      }));

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
        <img src="/src/assets/nft2png" alt="Synergy NFT Logo" className="logo" />
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
          {nfts.map(nft => (
            <div key={nft.id} className="nft-card">
              <img src={nft.image} alt={nft.name} />
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