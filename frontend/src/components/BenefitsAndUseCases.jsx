import './BenefitsAndUseCases.css';

function BenefitsAndUseCases() {
  return (
    <div className="benefits-page">
      <h2>Synergy NFTs: Building Pacific Business Success</h2>
      
      <div className="intro-section">
        <p>Synergy Blockchain Pacific NFTs represent more than digital art – they're your gateway to real-world benefits, exclusive opportunities, and a thriving business ecosystem in the Pacific region. With options at multiple price points, we've made our NFT ecosystem accessible to everyone.</p>
      </div>

      <div className="payment-options">
        <h3>Flexible Payment Options</h3>
        <p>Our NFTs can be purchased through multiple methods:</p>
        <ul>
          <li><strong>Cryptocurrency</strong> - Pay with POL on Polygon network</li>
          <li><strong>Samoan Tala</strong> - Direct bank transfer available</li>
          <li><strong>Credit/Debit Card</strong> - Coming soon to our mainnet version</li>
          <li><strong>Mobile Money</strong> - Support for regional mobile payment platforms</li>
        </ul>
      </div>

      <div className="for-customers-section">
        <h3>For Customers & Supporters</h3>
        
        <div className="nft-tier starter">
          <h4>Community NFT (25 Samoan Tala / ~$9 USD)</h4>
          <ul>
            <li>Basic access to Synergy community platform</li>
            <li>5% discount on select Synergy services</li>
            <li>Entry-level eligibility for future airdrops</li>
            <li>Access to basic educational content</li>
            <li>Entry to monthly community calls</li>
          </ul>
          <div className="cta-button">
            <button className="mint-button starter">Mint Community NFT</button>
          </div>
        </div>

        <div className="nft-tier loyalty">
          <h4>Loyalty NFT (50 Samoan Tala / ~$18 USD)</h4>
          <ul>
            <li>All Community NFT benefits</li>
            <li>10% discount on all Synergy services</li>
            <li>Medium-tier eligibility for future token airdrops</li>
            <li>Early access to new platform features</li>
            <li>Connect multiple Loyalty NFTs to increase your discount tier (up to 15%)</li>
            <li>Transferable discount benefits – gift or trade to others</li>
            <li>Quarterly newsletter with insider updates</li>
          </ul>
          <div className="cta-button">
            <button className="mint-button loyalty">Mint Loyalty NFT</button>
          </div>
        </div>

        <div className="nft-tier supporter">
          <h4>Supporter NFT (100 Samoan Tala / ~$36 USD)</h4>
          <ul>
            <li>All Loyalty NFT benefits (15% discount)</li>
            <li>Priority customer support</li>
            <li>Guaranteed allocation in future token sales</li>
            <li>Exclusive community access with development updates</li>
            <li>Quarterly virtual meetups with the Synergy team</li>
            <li>Higher chance of qualifying for bonus token airdrops</li>
            <li>Early beta access to new platform tools</li>
          </ul>
          <div className="cta-button">
            <button className="mint-button supporter">Mint Supporter NFT</button>
          </div>
        </div>

        <div className="nft-tier vip">
          <h4>VIP NFT (250 Samoan Tala / ~$91 USD)</h4>
          <ul>
            <li>All Supporter NFT benefits (20% discount)</li>
            <li>Maximum discount tier on all Synergy services</li>
            <li>Personalized blockchain consultation session (30 minutes)</li>
            <li>First access to limited edition NFT drops</li>
            <li>Invitation to annual Synergy Pacific business summit</li>
            <li>Premium allocation in future token sales and airdrops</li>
            <li>Voting rights on certain platform development decisions</li>
            <li>Exclusive VIP Discord channel access</li>
          </ul>
          <div className="cta-button">
            <button className="mint-button vip">Mint VIP NFT</button>
          </div>
        </div>

        <div className="nft-tier enterprise">
          <h4>Enterprise Package (Custom Pricing)</h4>
          <ul>
            <li>Customized NFT collection for your business</li>
            <li>White-labeled NFT platform integration</li>
            <li>Custom loyalty program development</li>
            <li>Staff training and onboarding</li>
            <li>Technical integration with existing systems</li>
            <li>Dedicated account manager</li>
          </ul>
          <div className="cta-button">
            <button className="mint-button enterprise">Contact for Enterprise</button>
          </div>
        </div>

        <p className="highlight-text">The more you engage with our ecosystem, the greater your rewards! Collect multiple NFTs to unlock additional benefits and increase your eligibility for future airdrops.</p>
      </div>

      <div className="combo-deals">
        <h3>Special Bundle Offers</h3>
        <div className="bundle">
          <h4>Starter Bundle - 10% Off</h4>
          <p>1 Community NFT + 1 Loyalty NFT</p>
          <p><strong>67.5 Samoan Tala</strong> (Save 7.5 Tala)</p>
        </div>
        <div className="bundle">
          <h4>Business Bundle - 15% Off</h4>
          <p>1 Loyalty NFT + 1 Supporter NFT</p>
          <p><strong>127.5 Samoan Tala</strong> (Save 22.5 Tala)</p>
        </div>
        <div className="bundle">
          <h4>Premium Bundle - 20% Off</h4>
          <p>1 Supporter NFT + 1 VIP NFT</p>
          <p><strong>280 Samoan Tala</strong> (Save 70 Tala)</p>
        </div>
      </div>

      <div className="for-businesses-section">
        <h3>For Businesses & Entrepreneurs</h3>
        
        <h4>Boost Your Business with NFT-Powered Loyalty</h4>
        <p>Transform your customer relationships with blockchain technology:</p>
        <ul>
          <li><strong>Create Limited Edition Promotions</strong> – Mint exclusive NFT vouchers that customers can redeem, trade, or gift</li>
          <li><strong>Reward Loyal Customers</strong> – Distribute NFTs as loyalty rewards with increasing benefits</li>
          <li><strong>Drive Repeat Business</strong> – Encourage return visits with NFT-based discount tiers</li>
          <li><strong>Build Community</strong> – Create exclusive experiences for NFT holders</li>
          <li><strong>Generate New Revenue Streams</strong> – Earn royalties when your NFTs are traded on secondary markets</li>
        </ul>

        <h4>Real-World Business Applications</h4>
        <div className="use-cases">
          <div className="use-case">
            <h5>Restaurants & Cafés</h5>
            <p>Issue NFT-based meal vouchers, create VIP membership tiers with special menu access, and offer cooking classes to NFT holders.</p>
          </div>
          
          <div className="use-case">
            <h5>Retail Stores</h5>
            <p>Create collectible NFTs with each purchase, offer early access to new products, and provide exclusive in-store experiences.</p>
          </div>
          
          <div className="use-case">
            <h5>Tourism & Hospitality</h5>
            <p>Develop seasonal packages as NFTs, create digital collectibles of iconic locations, and offer NFT-gated premium experiences.</p>
          </div>
          
          <div className="use-case">
            <h5>Event Organizers</h5>
            <p>Sell tickets as NFTs with built-in royalties for resales, offer exclusive meet-and-greets, and provide commemorative collectibles.</p>
          </div>
        </div>
      </div>

      <div className="integration-section">
        <h3>Seamless Integration with Your Business</h3>
        <p>Synergy Blockchain Pacific provides end-to-end support:</p>
        <ul>
          <li>Custom NFT design and creation aligned with your brand</li>
          <li>Technical integration with your existing systems</li>
          <li>Marketing support to launch your NFT program</li>
          <li>Training for your team to manage the NFT ecosystem</li>
          <li>Analytics to measure program performance</li>
        </ul>
        <p>Connect with our Telegram bot for additional points and rewards that sync with your NFT benefits!</p>
      </div>

      <div className="telegram-section">
        <h3>Join Our Telegram Community</h3>
        <p>Enhance your NFT experience by connecting with our Telegram bot:</p>
        <ul>
          <li>Earn additional points through community engagement</li>
          <li>Participate in exclusive giveaways</li>
          <li>Get instant notifications about new drops</li>
          <li>Access interactive challenges for bonus rewards</li>
          <li>Link your wallet to track your NFT benefits</li>
        </ul>
        <button className="telegram-button">Join Telegram Community</button>
      </div>

      <div className="roadmap-section">
        <h3>Platform Roadmap</h3>
        <div className="roadmap">
          <div className="roadmap-item">
            <h4>Q2 2025</h4>
            <ul>
              <li>Testnet MVP Launch</li>
              <li>Initial NFT Collections</li>
              <li>Telegram Bot Integration</li>
            </ul>
          </div>
          <div className="roadmap-item">
            <h4>Q3 2025</h4>
            <ul>
              <li>Mainnet Migration</li>
              <li>Fiat Payment Integration</li>
              <li>Business Partnership Program</li>
            </ul>
          </div>
          <div className="roadmap-item">
            <h4>Q4 2025</h4>
            <ul>
              <li>Token Launch</li>
              <li>NFT Marketplace</li>
              <li>Mobile App Release</li>
              <li>Initial Airdrops for NFT Holders</li>
            </ul>
          </div>
          <div className="roadmap-item">
            <h4>Q1 2026</h4>
            <ul>
              <li>Cross-Chain Support</li>
              <li>Physical/Digital Integration</li>
              <li>Regional Expansion</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h3>Ready to Transform Your Business?</h3>
        <p>Contact our team today to schedule a consultation and discover how NFTs can drive growth for your Pacific business.</p>
        <button className="contact-button">Schedule Consultation</button>
      </div>
    </div>
  );
}

export default BenefitsAndUseCases;