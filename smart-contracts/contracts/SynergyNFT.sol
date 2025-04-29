// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SynergyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string private _baseURIextended;
    AggregatorV3Interface internal priceFeed; // MATIC/USD
    mapping(uint256 => uint256) public nftTypeCounts;
    mapping(uint256 => uint256) public nftTypeToTokenId;
    mapping(uint256 => uint256) public tokenIdToTimestamp;

    // USD prices (in cents) for NFTs
    uint256 public constant LOYALTY_PRICE_USD = 5000; // $50
    uint256 public constant SUPPORTER_PRICE_USD = 7500; // $75
    uint256 public constant VIP_PRICE_USD = 10000; // $100
    uint256 public constant CUSTOM_MIN_PRICE_USD = 20000; // $200 minimum

    event NFTMinted(address indexed recipient, uint256 tokenId, string tokenURI, uint256 nftType, uint256 timestamp);
    event TokenURIUpdated(uint256 indexed tokenId, string tokenURI);
    event FiatMintRequested(address indexed recipient, uint256 nftType, string tokenURI);

    constructor(string memory baseURI_, address priceFeedAddress) ERC721("SynergyNFT", "SNFT") Ownable(msg.sender) {
        _baseURIextended = baseURI_;
        priceFeed = AggregatorV3Interface(priceFeedAddress); // Amoy MATIC/USD: 0x001382149eBa3441043c1c66972bD537E25019e2
    }

    function mintNFT(address recipient, string memory tokenURI, uint256 nftType) 
        public 
        payable 
        returns (uint256) 
    {
        require(nftType <= 3, "Invalid NFT type");
        uint256 requiredValue = getPriceInMatic(nftType);
        if (nftType == 3) {
            require(msg.value >= requiredValue, "Insufficient payment for custom NFT");
        } else {
            require(msg.value >= requiredValue, "Insufficient payment");
        }
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");

        return _mintNFT(recipient, tokenURI, nftType);
    }

    function mintByOwner(address recipient, string memory tokenURI, uint256 nftType) 
        external 
        onlyOwner 
        returns (uint256) 
    {
        require(nftType <= 3, "Invalid NFT type");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");
        return _mintNFT(recipient, tokenURI, nftType);
    }

    function requestFiatMint(address recipient, string memory tokenURI, uint256 nftType) 
        external 
        returns (uint256) 
    {
        require(nftType <= 3, "Invalid NFT type");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");
        emit FiatMintRequested(recipient, nftType, tokenURI);
        return getPriceInWST(nftType);
    }

    function _mintNFT(address recipient, string memory tokenURI, uint256 nftType) 
        internal 
        returns (uint256) 
    {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        nftTypeCounts[nftType]++;
        nftTypeToTokenId[newTokenId] = nftType;
        tokenIdToTimestamp[newTokenId] = block.timestamp;

        emit NFTMinted(recipient, newTokenId, tokenURI, nftType, block.timestamp);
        return newTokenId;
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI) external onlyOwner {
        require(_exists(tokenId), "ERC721: URI set for nonexistent token");
        require(bytes(tokenURI).length > 0, "Token URI cannot be empty");
        _setTokenURI(tokenId, tokenURI);
        emit TokenURIUpdated(tokenId, tokenURI);
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIextended;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getNftTypeCount(uint256 nftType) public view returns (uint256) {
        return nftTypeCounts[nftType];
    }

    function getPriceInUSD(uint256 nftType) public pure returns (uint256) {
        if (nftType == 0) return LOYALTY_PRICE_USD;
        if (nftType == 1) return SUPPORTER_PRICE_USD;
        if (nftType == 2) return VIP_PRICE_USD;
        return CUSTOM_MIN_PRICE_USD;
    }

    function getPriceInWST(uint256 nftType) public pure returns (uint256) {
        uint256 usdPrice = getPriceInUSD(nftType);
        return usdPrice * 270 / 100; // 1 USD ≈ 2.7 WST
    }

    function getPriceInMatic(uint256 nftType) public view returns (uint256) {
        uint256 usdPrice = getPriceInUSD(nftType);
        (, int256 price,,,) = priceFeed.latestRoundData();
        uint256 maticPrice = (usdPrice * 1e18) / uint256(price);
        return maticPrice + (maticPrice * 10 / 100); // 10% fee for gas/processing
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721: URI query for nonexistent token");
        string memory uri = super.tokenURI(tokenId);
        return bytes(uri).length > 0 ? uri : string(abi.encodePacked(_baseURIextended, uint2str(tokenId)));
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
