import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function PlatformContractBtns() {
  const { state: { contract_platformEntity, accounts } } = useEth();

  // createCourse
  const [createCourse_inputCourseID, createCourse_setInputValueInteger] = useState("");
  const handle_createCourse_inputCourseID = (event) => {
    const value = parseInt(event.target.value);
    createCourse_setInputValueInteger(isNaN(value) ? 0 : value);
  }

  const [createCourse_inputCurseName, createCourse_setInputValueString] = useState("");
  const handle_createCourse_inputCurseName = (event) => {
    createCourse_setInputValueString(event.target.value);
  };

  const createCourse = async e => {
    console.log("Interger Input Course ID:", createCourse_inputCourseID);
    console.log("String Input Course Name:", createCourse_inputCurseName);
    await contract_platformEntity.methods.createCourse(createCourse_inputCourseID, createCourse_inputCurseName).send({ from: accounts[1] });
  }

  
  // registerStudentToCourse
  const [registerStudentToCourse_inputStudentAddress, registerStudentToCourse_setInputValueString] = useState("");
  const handle_registerStudentToCourse_inputStudentAddress = (event) => {
    registerStudentToCourse_setInputValueString(event.target.value);
  };
  
  const [registerStudentToCourse_inputCourseID, registerStudentToCourse_setInputValueInteger] = useState("");
  const handle_registerStudentToCourse_inputCourseID = (event) => {
    const value = parseInt(event.target.value);
    registerStudentToCourse_setInputValueInteger(isNaN(value) ? 0 : value);
  }

  const registerStudentToCourse = async e => {
    console.log("String Input Student Address:", registerStudentToCourse_inputStudentAddress);
    console.log("String Input Course ID:", registerStudentToCourse_inputCourseID);
    await contract_platformEntity.methods.registerStudentToCourse(registerStudentToCourse_inputStudentAddress, registerStudentToCourse_inputCourseID).send({ from: accounts[1] });
  }



  // updateCourseProgress
  const [updateCourseProgress_inputStudentAddress, updateCourseProgress_setInputValueString] = useState("");
  const handle_updateCourseProgress_inputStudentAddress = (event) => {
    updateCourseProgress_setInputValueString(event.target.value);
  };
  
  const [updateCourseProgress_inputCourseID, updateCourseProgress_setInputValueInteger] = useState("");
  const handle_updateCourseProgress_inputCourseID = (event) => {
    const value = parseInt(event.target.value);
    updateCourseProgress_setInputValueInteger(isNaN(value) ? 0 : value);
  }

  const [updateCourseProgress_inputCompletedMilestoneIDs, updateCourseProgress_setInputValueArrayInteger] = useState("");
  const handle_updateCourseProgress_inputCompletedMilestoneIDs = (event) => {
    const value = event.target.value;
    // Split the input string into an array of integers
    const integerArray = value.split(',').map(item => parseInt(item.trim())).filter(item => !isNaN(item));
    updateCourseProgress_setInputValueArrayInteger(integerArray);
    // updateCourseProgress_setInputValueArrayInteger(event.target.value);
  }

  const updateCourseProgress = async e => {
    console.log("String Input Student Address:", updateCourseProgress_inputStudentAddress);
    console.log("String Input Course ID:", updateCourseProgress_inputCourseID);
    console.log("String Input Milestones:", updateCourseProgress_inputCompletedMilestoneIDs);
    await contract_platformEntity.methods.updateCourseProgress(updateCourseProgress_inputStudentAddress, updateCourseProgress_inputCourseID, updateCourseProgress_inputCompletedMilestoneIDs).send({ from: accounts[1] });
  }


  // setNFTContract
  const [setNFTContract_inputNFTAddress, setNFTContract_setInputValueString] = useState("");
  const handle_setNFTContract_inputNFTAddress = (event) => {
    setNFTContract_setInputValueString(event.target.value);
  };
  const setNFTContract = async e => {
    console.log("String Input NFT Address:", setNFTContract_inputNFTAddress);
    await contract_platformEntity.methods.setNFTContract(setNFTContract_inputNFTAddress).send({ from: accounts[1] });
  }


  // generateNFTForStudent
  const [generateNFTForStudent_inputStudentAddress, generateNFTForStudent_setInputValueString] = useState("");
  const handle_generateNFTForStudent_inputStudentAddress = (event) => {
    generateNFTForStudent_setInputValueString(event.target.value);
  };
  
  const [generateNFTForStudent_inputCourseID, generateNFTForStudent_setInputValueInteger] = useState("");
  const handle_generateNFTForStudent_inputCourseID = (event) => {
    const value = parseInt(event.target.value);
    generateNFTForStudent_setInputValueInteger(isNaN(value) ? 0 : value);
  }

  const generateNFTForStudent = async e => {
    console.log("String Input Student Address:", generateNFTForStudent_inputStudentAddress);
    console.log("String Input Course ID:", generateNFTForStudent_inputCourseID);
    await contract_platformEntity.methods.generateNFTForStudent(generateNFTForStudent_inputStudentAddress, generateNFTForStudent_inputCourseID).send({ from: accounts[1] });
  }


  return (
    <div className="btns">
      <div>
        {/* for padding */}
      </div>

      {/* createCourse */}
      <div>
        <input
          type="number"
          placeholder="Course ID"
          value={createCourse_inputCourseID}
          onChange={handle_createCourse_inputCourseID}
        />
        <input
          type="text"
          placeholder="Course Name"
          value={createCourse_inputCurseName}
          onChange={handle_createCourse_inputCurseName}
        />
        <button onClick={createCourse}>Create Course</button>
      </div>
      {/* registerStudentToCourse */}
      <div>
      <input
          type="text"
          placeholder="Student Address"
          value={registerStudentToCourse_inputStudentAddress}
          onChange={handle_registerStudentToCourse_inputStudentAddress}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={registerStudentToCourse_inputCourseID}
          onChange={handle_registerStudentToCourse_inputCourseID}
        />
        <button onClick={registerStudentToCourse}>Register student to course</button>
      </div>

      {/* updateCourseProgress */}
      <div>
      <input
          type="text"
          placeholder="Student Address"
          value={updateCourseProgress_inputStudentAddress}
          onChange={handle_updateCourseProgress_inputStudentAddress}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={updateCourseProgress_inputCourseID}
          onChange={handle_updateCourseProgress_inputCourseID}
        />
        <input
          type="text"
          placeholder="Percentage in integer"
          value={updateCourseProgress_inputCompletedMilestoneIDs}
          onChange={handle_updateCourseProgress_inputCompletedMilestoneIDs}
        />
        <button onClick={updateCourseProgress}>Update student course progress</button>
      </div>

      {/* setNFTContract */}
      <div>
      <input
          type="text"
          placeholder="NFT Address"
          value={setNFTContract_inputNFTAddress}
          onChange={handle_setNFTContract_inputNFTAddress}
        />
        <button onClick={setNFTContract}>Set the address of the NFT contract</button>
      </div>

      {/* generateNFTForStudent */}
      <div>
      <input
          type="text"
          placeholder="Student Address"
          value={generateNFTForStudent_inputStudentAddress}
          onChange={handle_generateNFTForStudent_inputStudentAddress}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={generateNFTForStudent_inputCourseID}
          onChange={handle_generateNFTForStudent_inputCourseID}
        />
        <button onClick={generateNFTForStudent}>Generate NFT for student</button>
      </div>
    </div>
  );
}

export default PlatformContractBtns;
