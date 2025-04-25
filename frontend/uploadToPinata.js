import { createReadStream, readFileSync, existsSync } from 'fs';
import { basename, join } from 'path';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

// Load .env.development explicitly
dotenv.config({ path: './.env.development' });

// Base path for metadata files (relative to frontend/)
const BASE_PATH = join(process.cwd(), 'public', 'metadata');

async function uploadFile(filePath) {
  try {
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const file = createReadStream(filePath);
    const fileName = basename(filePath);
    const formData = new FormData();
    formData.append('file', file, fileName);

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
        ...formData.getHeaders()
      }
    });

    const cid = response.data.IpfsHash;
    console.log(`Uploaded ${fileName}: ipfs://${cid}`);
    return cid;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.response?.data || error.message);
    throw error;
  }
}

async function uploadMetadata(jsonPath, imageCid) {
  try {
    if (!existsSync(jsonPath)) {
      throw new Error(`File not found: ${jsonPath}`);
    }
    const metadata = JSON.parse(readFileSync(jsonPath));
    metadata.image = `ipfs://${imageCid}`;
    const fileName = basename(jsonPath);

    const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      pinataMetadata: { name: fileName },
      pinataContent: metadata
    }, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
        'Content-Type': 'application/json'
      }
    });

    const cid = response.data.IpfsHash;
    console.log(`Uploaded ${fileName}: ipfs://${cid}`);
    return cid;
  } catch (error) {
    console.error(`Error uploading ${jsonPath}:`, error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  try {
    // Verify environment variables
    if (!process.env.VITE_PINATA_JWT || !process.env.VITE_PINATA_GATEWAY) {
      throw new Error('Missing VITE_PINATA_JWT or VITE_PINATA_GATEWAY in .env.development');
    }

    // Upload images
    const loyaltyImageCid = await uploadFile(join(BASE_PATH, 'loyalty-nft.png'));
    const supporterImageCid = await uploadFile(join(BASE_PATH, 'supporter-nft.png'));
    const vipImageCid = await uploadFile(join(BASE_PATH, 'vip-nft.png'));

    // Upload metadata with updated image CIDs
    const loyaltyMetadataCid = await uploadMetadata(join(BASE_PATH, 'loyalty-nft.json'), loyaltyImageCid);
    const supporterMetadataCid = await uploadMetadata(join(BASE_PATH, 'supporter-nft.json'), supporterImageCid);
    const vipMetadataCid = await uploadMetadata(join(BASE_PATH, 'vip-nft.json'), vipImageCid);

    // Output CIDs for NFTMinter.jsx
    console.log("Update NFTMinter.jsx with:");
    console.log(`const metadataURIs = [
  'ipfs://${loyaltyMetadataCid}',
  'ipfs://${supporterMetadataCid}',
  'ipfs://${vipMetadataCid}'
];`);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

main();