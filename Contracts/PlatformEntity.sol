// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the NFT contract
interface NFT_contract_interface {
    function createCommemorativeNFT(address student, string memory courseName) external returns (uint256);
    // We can add other necessary functions from the NFT contract if required
}


contract PlatformEntity {
    // Structure to store course information
    struct Course {
        string name;
        uint256[] milestoneIDs; // List of milestone IDs for the course
    }

    // Structure to track course progress for a student
    struct CourseProgress {
        uint256 courseID;
        uint256[] completedMilestoneIDs; // List of completed milestone IDs for the course
    }

    mapping(uint256 => Course) public courses; // Map courses with their IDs
    mapping(address => CourseProgress[]) public studentCourseProgress; // Map students with their course progress

    // Address of the NFT contract
    address public nftContractAddress;

    // Modifier to ensure only the NFT contract can access certain functions
    modifier onlyNFTContract() {
        require(msg.sender == nftContractAddress, "Only NFT contract can access this function");
        _;
    }

    // Event to emit NFT address on creation
    event NFTCreated(uint256 indexed nftID, address indexed studentAddress, string courseName);

    // Create a new course
    function createCourse(uint256 courseID, string memory courseName) external {
        // Perform course creation logic, such as storing course details and generating milestone IDs
        courses[courseID].name = courseName;
    }

    // Register a student to a course
    function registerStudentToCourse(address studentAddress, uint256 courseID) external {
        // Performing student registration logic
        // Need to add more checks such as checking if the course exists and adding it to the student's course progress
        studentCourseProgress[studentAddress].push(CourseProgress(courseID, new uint256[](0)));
    }

    // Update course progress for a student
    function updateCourseProgress(address studentAddress, uint256 courseID, uint256[] calldata completedMilestones) external {
        // Perform course progress update logic, such as adding completed milestone IDs to the student's record
        CourseProgress[] storage progress = studentCourseProgress[studentAddress];
        for (uint256 i = 0; i < progress.length; i++) {
            if (progress[i].courseID == courseID) {
                progress[i].completedMilestoneIDs = completedMilestones;
                break;
            }
        }
    }

        // Set the address of the NFT contract
    function setNFTContract(address nftAddress) external {
        nftContractAddress = nftAddress;
    }

    // Call the NFT contract to generate an NFT for a student upon course completion
    function generateNFTForStudent(address studentAddress, uint256 courseID) external {
        // Perform NFT generation logic and emit the NFT address
        string memory courseName = courses[courseID].name;
        uint256 nftID = NFT_contract_interface(nftContractAddress).createCommemorativeNFT(studentAddress, courseName);
        emit NFTCreated(nftID, studentAddress, courseName);
    }



    // // This function is abstract and needs to be implemented in the inherited contract for NFT creation
    // function generateNFT(address student, string memory courseName) virtual internal returns (uint256);
}
