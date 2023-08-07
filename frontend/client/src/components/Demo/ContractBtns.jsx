import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract_simpleStorage, contract_regulatedEntity, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const [inputValueString, setInputValueString] = useState("");
  const [inputValueInteger, setInputValueInteger] = useState(0);
  const [inputStudentName, setInputStudentName] = useState("");
  const [inputStudentAddress, setInputStudentAddress] = useState("");
  
  const handleStringInputChange = (event) => {
    setInputValueString(event.target.value);
  };

  const handleIntegerInputChange = (event) => {
    const value = parseInt(event.target.value);
    setInputValueInteger(isNaN(value) ? 0 : value);
  };

  const handleStudentNameChange = (event) => {
    setInputStudentName(event.target.value);
  };

  const handleStudentAddressChange = (event) => {
    setInputStudentAddress(event.target.value);
  };

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract_simpleStorage.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract_simpleStorage.methods.write(newValue).send({ from: accounts[0] });
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

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <button onClick={RegisterRegulatedEntity}>
        RegisterRegulatedEntity()
      </button>

      <div>
        <input
          type="text"
          placeholder="string"
          value={inputValueString}
          onChange={handleStringInputChange}
        />
        <input
          type="number"
          placeholder="integer"
          value={inputValueInteger}
          onChange={handleIntegerInputChange}
        />
        <button onClick={RegisterCourse}>Register Course</button>

        
    </div>
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
      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
