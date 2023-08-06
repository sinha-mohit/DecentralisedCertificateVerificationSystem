// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegulatedEntity {

    uint256 public totalCourses;

    // Structure to store student information
    struct Student {
        string name;
        address studentAddress;
        mapping (uint256 => bool) hasCourseId; // Mapping to check if course is assigned to the student
        mapping(uint256 => bool) hasTranscript; // Mapping to check if a transcript is available for a course
    }

    struct Course {
        uint256 courseId;
        string courseName;
        uint256 capacity;
        uint256 enrolledStudents;
        mapping(uint256 => address) courseIdStudentAddrMap; // Mapping to store student addresses for a course
    }

    mapping(address => bool) public isRegulatedEntity; // Check if an address is a regulated entity
    mapping(address => bool) public isPrivateEntity; // Check if an address is a whitelisted private entity
    mapping(address => Student) public globaladdrsStudentMap; // Map students with their addresses
    mapping(uint256 => Course) public coursesMap;
    uint256 public courseCounter;


    // Modifier to ensure only regulated entities can access certain functions
    modifier onlyRegulatedEntity() {
        require(isRegulatedEntity[msg.sender], "Only regulated entities can access this function");
        _;
    }

    // Modifier to ensure only whitelisted private entities can access certain functions
    modifier onlyWhitelistedEntity() {
        require(isPrivateEntity[msg.sender], "Only whitelisted private entities can access this function");
        _;
    }

    // Events for contract interaction tracking
    event RegulatedEntityRegistered(address indexed entityAddress);
    event PrivateEntityWhitelisted(address indexed entityAddress);
    event StudentRegistered(string indexed name, address indexed studentAddress);
    event CourseRegistered(string indexed name, uint256 indexed capacity);
    event StudentAssignedToCourse(address indexed studentAddress, uint256 indexed courseID);
    event TranscriptAdded(address indexed studentAddress, uint256 indexed courseID);
    event TranscriptVerified(address indexed studentAddress, uint256 indexed courseID);

    constructor() {
        isRegulatedEntity[msg.sender] = true;
        courseCounter = 0;
        totalCourses = 0;
    }
    
    // Register a new regulated entity
    function registerRegulatedEntity() external {
        isRegulatedEntity[msg.sender] = true;
        emit RegulatedEntityRegistered(msg.sender);
    }

    // Register a new course
    function registerCourse(string memory courseName, uint256 capacity) external onlyRegulatedEntity {
        // Performing course registration logic
        // We can add further logic to handle course registration, such as adding a few more checks

        require(capacity > 0, "Capacity should be greater than zero.");
        Course storage newCourse = coursesMap[courseCounter];
        newCourse.courseId = courseCounter;
        newCourse.courseName = courseName;
        newCourse.capacity = capacity;
        newCourse.enrolledStudents = 0;
        courseCounter++;
        totalCourses++;
        emit CourseRegistered(courseName, capacity);
    }
    

    // Register a new student
    function registerStudent(string memory studentName, address studentAddress) external onlyRegulatedEntity{
        Student storage newStudent = globaladdrsStudentMap[msg.sender];
        newStudent.name = studentName;
        newStudent.studentAddress = studentAddress;
        emit StudentRegistered(studentName, studentAddress);
    }

    // Assign a student to a course
    function assignStudentToCourse(address studentAddress, uint256 courseID) external onlyRegulatedEntity {
        // Perform student assignment logic, such as checking if the student exists and adding the course ID to the student's record
        // We can also add further checks
        
        require(studentAddress != address(0), "Invalid student address.");
        // require(coursesMap[courseID].courseId != 0, "Course does not exist.");
        require(coursesMap[courseID].enrolledStudents < coursesMap[courseID].capacity, "Course is already full.");

        // Additional checks, if needed, such as verifying student credentials before enrollment

        coursesMap[courseID].enrolledStudents++;
        coursesMap[courseID].courseIdStudentAddrMap[coursesMap[courseID].enrolledStudents] = studentAddress;        
        
        require(globaladdrsStudentMap[studentAddress].hasCourseId[courseID] == false, "Course is already registered for this student address");
        globaladdrsStudentMap[studentAddress].hasCourseId[courseID] = true;
        
        emit StudentAssignedToCourse(studentAddress, courseID);
    }

    // Whitelist a private entity
    function whitelistPrivateEntity(address entityAddress) external onlyRegulatedEntity {
        isPrivateEntity[entityAddress] = true;
        emit PrivateEntityWhitelisted(entityAddress);
    }

    // Add student transcript for a course
    function addStudentTranscript(address studentAddress, uint256 courseID) external onlyRegulatedEntity {
        // add check to ensure transcript is added for only enrolled courses
        require(globaladdrsStudentMap[studentAddress].hasCourseId[courseID] == true, "Student is not enrolled to this course for which transcript is requested");
        globaladdrsStudentMap[studentAddress].hasTranscript[courseID] = true;
        emit TranscriptAdded(studentAddress, courseID);
    }

    // Verify student transcript by a whitelisted private entity
    function verifyTranscript(address studentAddress, uint256 courseID) external onlyWhitelistedEntity {
        // Performing transcript verification logic
        // We can add further checks to ensure the student is registered and has completed the course
        require(globaladdrsStudentMap[studentAddress].hasTranscript[courseID] == true, "Student does not have a added transcript");
        emit TranscriptVerified(studentAddress, courseID);
    }

    // // This function is abstract and needs to be implemented in the inherited contract for NFT creation
    // function generateNFT(address student, string memory courseName) virtual internal returns (uint256);
}
