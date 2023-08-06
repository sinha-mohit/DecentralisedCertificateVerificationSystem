// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the RegulatedEntity contract
interface RegulatedEntityContract {
    function verifyTranscript(address studentAddress, uint256 courseID) external;
}

contract ExternalVerifier {

    struct Entity {
        string name;
        address entityAddress;
    }

    mapping(address => bool) public isPrivateEntity; // Check if an address is a private entity
    mapping(address => Entity) public entities; // Map entity addresses to their details
    address[] public entityAddresses; // Array to store all private entity addresses

    event PrivateEntityCreated(address indexed entityAddress);

    RegulatedEntityContract private regulatedEntityContract;

    constructor(address _regulatedEntityContractAddress) {
        regulatedEntityContract = RegulatedEntityContract(_regulatedEntityContractAddress);
    }

    function createPrivateEntity(string memory entityName) external {
        require(!isPrivateEntity[msg.sender], "An entity already exists under this address");

        Entity storage newEntity = entities[msg.sender];
        newEntity.name = entityName;
        newEntity.entityAddress = msg.sender;

        isPrivateEntity[msg.sender] = true;
        entityAddresses.push(msg.sender);
        
        emit PrivateEntityCreated(msg.sender);
    }


    function verifyTranscript(address studentAddress, uint256 courseID) external {
        regulatedEntityContract.verifyTranscript(studentAddress, courseID);
        // Add any additional logic you want to perform after verifying the transcript
    }
}