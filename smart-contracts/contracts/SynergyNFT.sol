// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SynergyNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum NFTType { Loyalty, Supporter, VIP }
    mapping(uint256 => NFTType) public nftTypes;
    mapping(address => NFTData[]) private _userNFTs;
    mapping(uint256 => uint256) public nftPrices;

    struct NFTData {
        uint256 tokenId;
        string tokenURI;
        uint256 nftType;
    }

    event NFTMinted(address recipient, uint256 tokenId, NFTType nftType);

    constructor() ERC721("SynergyBlockchainPacific", "SBP") {
    nftPrices[0] = 0.5 ether;  // Loyalty: 0.5 MATIC
    nftPrices[1] = 0.75 ether; // Supporter: 0.75 MATIC
    nftPrices[2] = 1 ether;    // VIP: 1 MATIC
}

    function mintNFT(address recipient, string memory tokenURI, uint256 nftType) 
        external payable nonReentrant
        returns (uint256)
    {
        require(nftType <= 2, "Invalid NFT type");
        require(msg.value >= nftPrices[nftType], "Insufficient payment");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nftTypes[newItemId] = NFTType(nftType);
        _userNFTs[recipient].push(NFTData(newItemId, tokenURI, nftType));

        emit NFTMinted(recipient, newItemId, NFTType(nftType));

        if (msg.value > nftPrices[nftType]) {
            (bool sent, ) = msg.sender.call{value: msg.value - nftPrices[nftType]}("");
            require(sent, "Refund failed");
        }

        return newItemId;
    }

    function getNFTType(uint256 tokenId) external view returns (NFTType) {
        require(_exists(tokenId), "NFT does not exist");
        return nftTypes[tokenId];
    }

    function getUserNFTs(address owner) external view returns (uint256[] memory, string[] memory, uint256[] memory) {
        NFTData[] memory userNFTs = _userNFTs[owner];
        uint256[] memory tokenIds = new uint256[](userNFTs.length);
        string[] memory tokenURIs = new string[](userNFTs.length);
        uint256[] memory nftTypesList = new uint256[](userNFTs.length);

        for (uint256 i = 0; i < userNFTs.length; i++) {
            tokenIds[i] = userNFTs[i].tokenId;
            tokenURIs[i] = userNFTs[i].tokenURI;
            nftTypesList[i] = userNFTs[i].nftType;
        }

        return (tokenIds, tokenURIs, nftTypesList);
    }

    function withdraw() external onlyOwner nonReentrant {
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Withdrawal failed");
    }
}
