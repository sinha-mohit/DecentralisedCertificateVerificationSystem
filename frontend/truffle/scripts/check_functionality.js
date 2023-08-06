const RegulatedEntity = artifacts.require("RegulatedEntity");
const ExternalVerifier = artifacts.require("ExternalVerifier");
const PlatformEntity = artifacts.require("PlatformEntity");
const NFTContract = artifacts.require("NFTContract");

module.exports = async function (callback) {
  try {
    // Get the deployed RegulatedEntity contract instance
    const regulatedEntityInstance = await RegulatedEntity.deployed();

    // Register a new regulated entity
    await regulatedEntityInstance.registerRegulatedEntity();
    console.log("Registered a new regulated entity.");

    // Register a new course
    const courseName = "Mathematics";
    const capacity = 100;
    await regulatedEntityInstance.registerCourse(courseName, capacity);
    console.log(`Registered a new course: ${courseName} with capacity: ${capacity}.`);

    // Register a new student
    const studentName = "John Doe";
    const studentAddress = "0xFdAF5471Ea0679388410ffFB380ff623fcAf72b5"; // Replace with an actual Ethereum address
    await regulatedEntityInstance.registerStudent(studentName, studentAddress);
    console.log(`Registered a new student: ${studentName} with address: ${studentAddress}.`);

    // Assign the student to the course
    const courseID = 0; // Assuming the course ID of the first registered course is 0
    await regulatedEntityInstance.assignStudentToCourse(studentAddress, courseID);
    console.log(`Assigned student with address ${studentAddress} to course with ID ${courseID}.`);

    // Whitelist a private entity (assuming the deployer's address is the regulated entity)
    const privateEntityInstance = await ExternalVerifier.deployed();
    const privateEntityAddress = privateEntityInstance.address; // Replace with the address of the private entity to be whitelisted
    await regulatedEntityInstance.whitelistPrivateEntity(privateEntityAddress);
    console.log(`Whitelisted private entity with address: ${privateEntityAddress}.`);

    // Add student transcript for the course
    await regulatedEntityInstance.addStudentTranscript(studentAddress, courseID);
    console.log(`Added transcript for student with address ${studentAddress} for course with ID ${courseID}.`);

    // Verify the student's transcript by the whitelisted private entity
    await privateEntityInstance.verifyTranscript(studentAddress, courseID);
    console.log(`Verified transcript for student with address ${studentAddress} for course with ID ${courseID}.`);

    // Get the total number of registered courses
    const totalCourses = await regulatedEntityInstance.totalCourses();
    console.log(`Total registered courses: ${totalCourses.toNumber()}`);

    // Get the course details for the first registered course (course ID 0)
    const course = await regulatedEntityInstance.coursesMap(courseID);
    console.log(`Course ID: ${course.courseId.toNumber()}`);
    console.log(`Course Name: ${course.courseName}`);
    console.log(`Capacity: ${course.capacity.toNumber()}`);
    console.log(`Enrolled Students: ${course.enrolledStudents.toNumber()}`);

    // Get the deployed PlatformEntity contract instance
    const PlatformEntityContractInstance = await PlatformEntity.deployed();

    // Create a new course
    const courseID_2 = 0; // Replace with the desired course ID
    const courseName_2 = "physics"; // Replace with the desired course name
    await PlatformEntityContractInstance.createCourse(courseID_2, courseName_2);
    console.log(`Created a new course: ${courseName_2} with ID: ${courseID_2}`);

    // Register a student to the specified course
    const studentAddress_2 = "0x7CD296ECD22a9a0402dF6C31bA81129c52F550fF"; // Replace with the student's Ethereum address
    await PlatformEntityContractInstance.registerStudentToCourse(studentAddress_2, courseID_2);
    console.log(`Registered student with address ${studentAddress_2} to course with ID ${courseID_2}.`);

    // Update course progress for the student with the completed milestone IDs
    const completedMilestones = [1, 2]; // Replace with the completed milestone IDs
    await PlatformEntityContractInstance.updateCourseProgress(studentAddress_2, courseID_2, completedMilestones);
    console.log(`Updated course progress for student with address ${studentAddress_2} for course with ID ${courseID_2}.`);

    // Set the address of the NFT contract in the PlatformEntity contract
    const nftContractInstance = await NFTContract.deployed();
    const nftContractAddress = nftContractInstance.address;
    await PlatformEntityContractInstance.setNFTContract(nftContractAddress);
    console.log(`Set NFT contract address in PlatformEntity contract: ${nftContractAddress}`);

    // Set the address of the PlatformEntity contract in the NFT contract
    await nftContractInstance.setPlatformEntity(PlatformEntityContractInstance.address);
    console.log(`Set PlatformEntity contract address in NFT contract: ${PlatformEntityContractInstance.address}`);

    // Call the NFT contract to generate an NFT for the student upon course completion
    await PlatformEntityContractInstance.generateNFTForStudent(studentAddress_2, courseID_2);
    console.log(`Generated NFT for student with address ${studentAddress_2} for course with ID ${courseID_2}.`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
