// smart-contracts/scripts/check-nfts.js
const { Alchemy, Network } = require('alchemy-sdk');

const ALCHEMY_API_KEY = 'kJZi_A86EXSmHa6PHFLa05CdIs498hU4';
const CONTRACT_ADDRESS = '0x9fABC73C4ab85A45AFC536eCc2ce4929c812F3B1';
const OWNER_ADDRESSES = [
  '0x2c80200932c8733b09b70f9962d6302d9e6db2c5',
  '0x6f9fe524f2e8058f1fbca11d18fd02d58e17d9be',
];

const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.MATIC_AMOY,
});

async function checkNfts() {
  try {
    for (const owner of OWNER_ADDRESSES) {
      const nfts = await alchemy.nft.getNftsForOwner(owner, {
        contractAddresses: [CONTRACT_ADDRESS],
      });
      console.log(`NFTs for ${owner}:`);
      nfts.ownedNfts.forEach(nft => {
        console.log(`- Token ID: ${nft.tokenId}, Type: ${nft.title || 'Unknown'}`);
      });
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

checkNfts();