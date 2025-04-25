// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Network, Alchemy } = require("alchemy-sdk");
require("dotenv").config();

// Configure Alchemy settings
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Loaded from .env
  network: Network.MATIC_AMOY, // Polygon Amoy testnet
};

const alchemy = new Alchemy(settings);

// Test fetching a block
async function main() {
  try {
    const block = await alchemy.core.getBlock(15221026);
    console.log("Block data:", block);
  } catch (error) {
    console.error("Error fetching block:", error);
  }
}

main();