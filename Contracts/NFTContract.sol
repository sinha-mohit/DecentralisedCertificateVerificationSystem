// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// // Interface for the PlatformEntity contract
// interface PlatformEntity {
//     function createNFTForMilestone(address studentAddress, string memory courseName) external;
//     function createCommemorativeNFT(address studentAddress, string memory courseName) external;
// }

contract NFTContract is ERC721 {
    address public platformEntityAddress; // Address of the PlatformEntity contract

    // Structure to store NFT details
    struct NFTDetails {
        string courseName;
        bool isCommemorative;
    }

    // Mapping from NFT ID to its details
    mapping(uint256 => NFTDetails) public nftDetails;

    // Event to emit NFT details on creation
    event NFTCreated(uint256 indexed nftID, string courseName, bool isCommemorative);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    // Modifier to ensure only the PlatformEntity contract can access certain functions
    modifier onlyPlatformEntity() {
        require(msg.sender == platformEntityAddress, "Only PlatformEntity contract can access this function");
        _;
    }

    // Create a new NFT for each milestone completed by a student
    function createNFTForMilestone(address studentAddress, string memory courseName) external onlyPlatformEntity {
        // Generate a unique NFT ID based on the student address and course name
        uint256 nftID = uint256(keccak256(abi.encodePacked(studentAddress, courseName, block.timestamp)));

        // Mint the NFT
        _mint(studentAddress, nftID);

        // Store NFT details
        nftDetails[nftID] = NFTDetails(courseName, false);
        emit NFTCreated(nftID, courseName, false);
    }

    // Create an NFT to commemorate the completion of all course requirements (graded and ungraded)
    function createCommemorativeNFT(address studentAddress, string memory courseName) external onlyPlatformEntity returns (uint256){
        // Generate a unique NFT ID based on the student address and course name
        uint256 nftID = uint256(keccak256(abi.encodePacked(studentAddress, courseName, block.timestamp + 1)));

        // Mint the NFT
        _mint(studentAddress, nftID);

        // Store NFT details
        nftDetails[nftID] = NFTDetails(courseName, true);
        emit NFTCreated(nftID, courseName, true);
        return nftID;
    }

    // Set the address of the PlatformEntity contract
    function setPlatformEntity(address platformAddress) external {
        platformEntityAddress = platformAddress;
    }

    // Public function to verify all the details of an NFT
    function verifyNFT(uint256 nftID) external view returns (string memory courseName, bool isCommemorative) {
        require(_exists(nftID), "Invalid NFT ID");
        NFTDetails storage details = nftDetails[nftID];
        return (details.courseName, details.isCommemorative);
    }
}
