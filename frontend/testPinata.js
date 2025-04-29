import pinataSDK from 'pinata';

const pinataSDK = require('pinata');
const pinata = new pinataSDK('2f900fde93ab970a39623962', 
pinataApiSecret = import.meta.env.VITE_PINATA_API_SECRET,);
pinata.testAuthentication().then(console.log).catch(console.error);

  pinataApiSecret: import.meta.env.VITE_PINATA_API_SECRET,

async function testPinata() {
  try {
    const result = await pinata.testAuthentication();
    console.log('Pinata auth successful:', result);
  } catch (err) {
    console.error('Pinata auth failed:', err);
  }
}

testPinata();