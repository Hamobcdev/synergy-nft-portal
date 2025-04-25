function Instructions() {
  return (
    <div className="instructions">
      <h2>Getting Started with Synergy NFTs</h2>
      
      <h3>Set Up Your Wallet</h3>
      <p>To interact with our NFT platform, you'll need a digital wallet:</p>
      <ol>
        <li><strong>Install MetaMask</strong>: <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Download here</a> for your browser or mobile device.</li>
        <li><strong>Create a wallet</strong>: Follow MetaMask's setup instructions to create your wallet and securely store your seed phrase.</li>
        <li><strong>Connect to Polygon Amoy Testnet</strong>: 
          <ul>
            <li>Network Name: Polygon Amoy</li>
            <li>RPC URL: https://polygon-amoy.g.alchemy.com/v2/demo</li>
            <li>Chain ID: 80002</li>
            <li>Currency Symbol: POL</li>
            <li>Block Explorer: https://www.oklink.com/amoy</li>
          </ul>
        </li>
      </ol>

      <h3>Get Test Tokens</h3>
      <p>For testing our platform before mainnet launch:</p>
      <ol>
        <li>Visit the <a href="https://www.oklink.com/amoy/faucet" target="_blank" rel="noopener noreferrer">Polygon Amoy Faucet</a></li>
        <li>Enter your wallet address</li>
        <li>Request free test POL tokens</li>
        <li>Wait for tokens to appear in your wallet (usually within minutes)</li>
      </ol>

      <h3>Connect to Our Platform</h3>
      <ol>
        <li>Click "Connect Wallet" on our platform</li>
        <li>Approve the connection request in your MetaMask</li>
        <li>You're ready to browse and mint NFTs!</li>
      </ol>

      <h3>Video Tutorials</h3>
      <p>Need more help? Watch our step-by-step video guides:</p>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=MfkqgXNPiHg" target="_blank" rel="noopener noreferrer">Setting up MetaMask for beginners</a></li>
        <li><a href="https://www.youtube.com/watch?v=6h_liI6atEk" target="_blank" rel="noopener noreferrer">Connecting to Polygon Network</a></li>
        <li><a href="https://www.youtube.com/watch?v=wM1pgOnaKro" target="_blank" rel="noopener noreferrer">How to mint your first NFT</a></li>
      </ul>

      <h3>Our NFT Options</h3>
      <ul>
        <li><strong>Loyalty NFT</strong>: 50 Samoan Tala (~$18 USD)</li>
        <li><strong>Supporter NFT</strong>: 100 Samoan Tala (~$36 USD)</li>
        <li><strong>VIP NFT</strong>: 250 Samoan Tala (~$91 USD)</li>
      </ul>
      <p>Visit our "Benefits & Use Cases" page to learn what each NFT offers!</p>
    </div>
  );
}

export default Instructions;