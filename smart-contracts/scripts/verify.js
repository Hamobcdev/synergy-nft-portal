require('dotenv').config();
const { run } = require('hardhat');

async function main() {
  const contractAddress = '0xNewAddress'; // Replace with your deployed address
  await run('verify:verify', {
    address: contractAddress,
    constructorArguments: ['ipfs://', '0x001382149eBa3441043c1c66972bD537E25019e2'],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;

});
//   console.log('Contract verified successfully');