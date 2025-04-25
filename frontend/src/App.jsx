import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import WalletConnect from './components/WalletConnect';
import NFTMinter from './components/NFTMinter';
import NFTGallery from './components/NFTGallery';
import Instructions from './components/Instructions';
import Services from './components/Services';
import BenefitsAndUseCases from './components/BenefitsAndUseCases'; // Add this import
import ErrorBoundary from './components/ErrorBoundary';
import nft1 from './assets/nft1.png';
import nft2 from './assets/nft2.png';
import nft3 from './assets/nft3.png';
import nft4 from './assets/nft4.png';
import nft5 from './assets/nft5.png';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const staticNfts = [
    { src: nft1, title: 'HAMOBCDEV NFT#1' },
    { src: nft2, title: 'HAMOBCDEV NFT#2' },
    { src: nft3, title: 'HAMOBCDEV NFT#3' },
    { src: nft4, title: 'HAMOBCDEV NFT#4' },
    { src: nft5, title: 'HAMOBCDEV NFT#5' }
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Synergy Blockchain Pacific Logo" />
            </Link>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/about.html">About</a></li>
              <li><a href="/services.html">Services</a></li>
              <li><a href="/blog.html">Blog</a></li>
              <li><a href="/contacts.html">Contacts</a></li>
              <li><a href="/team.html">Team</a></li>
              <li><Link to="/nfts">NFT Portal</Link></li>
              <li><Link to="/instructions">Instructions</Link></li>
              <li><Link to="/benefits">Benefits & Use Cases</Link></li> {/* Add this new link */}
            </ul>
          </nav>
        </header>

        <div className="app-header">
          <h1>Synergy Blockchain Pacific</h1>
          <h2>NFT Loyalty & Support System</h2>
          <WalletConnect setIsConnected={setIsConnected} setAddress={setAddress} />
        </div>

        <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <img src="/src/assets/nft4.png" alt="Synergy NFT Logo" className="logo" />
                <h1>Welcome to Synergy Blockchain Pacific</h1>
                <p>Explore our NFT solutions for businesses in tourism, retail, and more.</p>
                {!isConnected ? (
                  <div className="connect-prompt">
                    <h3>Connect your wallet to mint and view NFTs</h3>
                    <p>This demo allows you to mint different types of NFTs:</p>
                    <ul>
                      <li><strong>Loyalty NFTs</strong> - 5% discount on future services</li>
                      <li><strong>Supporter NFTs</strong> - Proof of crowdfunding participation</li>
                      <li><strong>VIP NFTs</strong> - 24-month staking verification</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <NFTMinter userAddress={address} />
                    <NFTGallery userAddress={address} />
                  </div>
                )}
                <section className="static-nft-gallery">
                  <h2>Featured NFTs</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
                    {staticNfts.map((nft, index) => (
                      <div key={index} style={{ textAlign: 'center' }}>
                        <h3>{nft.title}</h3>
                        <img src={nft.src} alt={nft.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
          <Route
            path="/nfts"
            element={
              <div className="nft-portal">
                <NFTMinter userAddress={address} />
                <section className="static-nft-gallery">
                  <h2>Featured NFTs</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
                    {staticNfts.map((nft, index) => (
                      <div key={index} style={{ textAlign: 'center' }}>
                        <h3>{nft.title}</h3>
                        <img src={nft.src} alt={nft.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/benefits" element={<BenefitsAndUseCases />} /> {/* Add this new route */}
          <Route
            path="/gallery"
            element={
              <ErrorBoundary>
                <NFTGallery userAddress={address} />
              </ErrorBoundary>
            }
          />
        </Routes> 
        </main>

        <footer>
          <p>© 2025 Synergy Blockchain Pacific - NFT Demo</p>
          <div className="wave"></div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;