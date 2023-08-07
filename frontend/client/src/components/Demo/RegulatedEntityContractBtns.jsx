import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function RegulatedContractBtns() {
  const { state: { contract_regulatedEntity, accounts } } = useEth();

  const [inputValueString, setInputValueString] = useState("");
  const [inputValueInteger, setInputValueInteger] = useState();
  const [inputValueInteger_2, setInputValueInteger_2] = useState();
  const [inputCourseID, setInputCourseID] = useState();
  const [inputCourseID_2, setInputCourseID_2] = useState();


  const [inputStudentName, setInputStudentName] = useState("");
  const [inputStudentAddress, setInputStudentAddress] = useState("");
  const [inputStudentAddress_2, setInputStudentAddress_2] = useState("");
  const [inputStudentAddress_3, setInputStudentAddress_3] = useState("");
  const [inputStudentAddress_4, setInputStudentAddress_4] = useState("");

  const [inputPrivateEntityAddress, setInputPrivateEntityAddress] = useState("");
  
  const handleStringInputChange = (event) => {
    setInputValueString(event.target.value);
  };

  const handleIntegerInputChange = (event) => {
    const value = parseInt(event.target.value);
    setInputValueInteger(isNaN(value) ? 0 : value);
  };

  const handleIntegerInputChange_2 = (event) => {
    const value = parseInt(event.target.value);
    setInputValueInteger_2(isNaN(value) ? 0 : value);
  };

  const handleInputCourseID = (event) => {
    const value = parseInt(event.target.value);
    setInputCourseID(isNaN(value) ? 0 : value);
  };

  const handleInputCourseID_2 = (event) => {
    const value = parseInt(event.target.value);
    setInputCourseID_2(isNaN(value) ? 0 : value);
  };

  const handleStudentNameChange = (event) => {
    setInputStudentName(event.target.value);
  };

  const handleStudentAddressChange = (event) => {
    setInputStudentAddress(event.target.value);
  };

  const handleStudentAddressChange_2 = (event) => {
    setInputStudentAddress_2(event.target.value);
  };

  const handleStudentAddressChange_3 = (event) => {
    setInputStudentAddress_3(event.target.value);
  };

  const handleStudentAddressChange_4 = (event) => {
    setInputStudentAddress_4(event.target.value);
  };

  const handlePrivateEntityAddressChange_3 = (event) => {
    setInputPrivateEntityAddress(event.target.value);
  };

  const RegisterRegulatedEntity = async e => {
    await contract_regulatedEntity.methods.registerRegulatedEntity().send({ from: accounts[0] });
  }
  
  const RegisterCourse = async e => {
    console.log("String Input Value:", inputValueString);
    console.log("Integer Input Value:", inputValueInteger);
    await contract_regulatedEntity.methods.registerCourse(inputValueString, inputValueInteger).send({ from: accounts[0] });
    // Handle the registration logic using the inputValueString and inputValueInteger
  }

  const RegisterStudent = async e => {
    // Handle the student registration logic using inputStudentName and inputStudentAddress
    console.log("Student Name:", inputStudentName);
    console.log("Student Address:", inputStudentAddress);
    await contract_regulatedEntity.methods.registerStudent(inputStudentName, inputStudentAddress).send({ from: accounts[0] });
  };

  const verifyTranscript = async e => {
    console.log("Student Address:", inputStudentAddress_4);
    console.log("Course ID:", inputCourseID_2);
    await contract_regulatedEntity.methods.verifyTranscript(inputStudentAddress_4, inputCourseID_2).send({ from: accounts[0] });
  };

  const assignStudentToCourse = async e => {
    console.log("Student Address:", inputStudentAddress_2);
    console.log("Course ID:", inputValueInteger_2);
    await contract_regulatedEntity.methods.assignStudentToCourse(inputStudentAddress_2, inputValueInteger_2).send({ from: accounts[0] });
  };


  const whitelistPrivateEntity = async e => {
    console.log("Private Entity Address:", inputPrivateEntityAddress);
    await contract_regulatedEntity.methods.whitelistPrivateEntity(inputPrivateEntityAddress).send({ from: accounts[0] });
  };

  const addStudentTranscript = async e => {
    console.log("Student Address:", inputStudentAddress_3);
    console.log("Course ID:", inputCourseID);
    await contract_regulatedEntity.methods.addStudentTranscript(inputStudentAddress_3, inputCourseID).send({ from: accounts[0] });
  };
  return (
    <div className="btns">
      <div>
        {/* for padding */}
      </div>

      {/* RegisterRegulatedEntity */}
      <div>
        <button onClick={RegisterRegulatedEntity}>
          Register Regulated Entity
        </button>
      </div>

      {/* RegisterCourse */}
      <div>
        <input
          type="text"
          placeholder="Course Name"
          value={inputValueString}
          onChange={handleStringInputChange}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={inputValueInteger}
          onChange={handleIntegerInputChange}
        />
        <button onClick={RegisterCourse}>Register Course</button>
      </div>

      {/* RegisterStudent */}
      <div>
        <input
          type="text"
          placeholder="Student Name"
          value={inputStudentName}
          onChange={handleStudentNameChange}
        />
        <input
          type="text"
          placeholder="Student Address"
          value={inputStudentAddress}
          onChange={handleStudentAddressChange}
        />
        <button onClick={RegisterStudent}>Register Student</button>
      </div>

      {/* assignStudentToCourse */}
      <div>
        <input
          type="text"
          placeholder="Student Address"
          value={inputStudentAddress_2}
          onChange={handleStudentAddressChange_2}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={inputValueInteger_2}
          onChange={handleIntegerInputChange_2}
        />
        <button onClick={assignStudentToCourse}>Assign Student To Course</button>
      </div>

      {/* whitelistPrivateEntity */}
      <div>
        <input
          type="text"
          placeholder="Private Entity Address"
          value={inputPrivateEntityAddress}
          onChange={handlePrivateEntityAddressChange_3}
        />
        <button onClick={whitelistPrivateEntity}>Whitelist a private entity</button>
      </div>

      {/* addStudentTranscript */}
      <div>
        <input
          type="text"
          placeholder="Student Address"
          value={inputStudentAddress_3}
          onChange={handleStudentAddressChange_3}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={inputCourseID}
          onChange={handleInputCourseID}
        />
        <button onClick={addStudentTranscript}>Add student transcript for a course</button>
      </div>

      {/* verifyTranscript */}
      <div>
      <input
          type="text"
          placeholder="Student Address"
          value={inputStudentAddress_4}
          onChange={handleStudentAddressChange_4}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={inputCourseID_2}
          onChange={handleInputCourseID_2}
        />
        <button onClick={verifyTranscript}>Student transcript verification</button>
      </div>
      
      <div></div>
    </div>
  );
}

export default RegulatedContractBtns;
