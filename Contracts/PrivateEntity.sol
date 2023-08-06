// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the RegulatedEntity contract
interface RegulatedEntityContract {
    function verifyTranscript(address studentAddress, uint256 courseID) external;
}

contract ExternalVerifier {
    RegulatedEntityContract private regulatedEntityContract;

    constructor(address _regulatedEntityContractAddress) {
        regulatedEntityContract = RegulatedEntityContract(_regulatedEntityContractAddress);
    }

    function verifyTranscript(address studentAddress, uint256 courseID) external {
        regulatedEntityContract.verifyTranscript(studentAddress, courseID);
        // Add any additional logic you want to perform after verifying the transcript
    }
}
