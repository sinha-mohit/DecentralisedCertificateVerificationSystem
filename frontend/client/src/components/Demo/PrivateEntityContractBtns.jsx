import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function PrivateContractBtns() {
  const { state: { contract_ExternalVerifier, accounts, address_ExternalVerifier } } = useEth();

  // createPrivateEntity
  const [createPrivateEntity_inputEntityName, createPrivateEntity_setInputValueString] = useState("");
  const handle_createPrivateEntity_inputEntityName = (event) => {
    createPrivateEntity_setInputValueString(event.target.value);
  };
  const createPrivateEntity = async e => {
    await contract_ExternalVerifier.methods.createPrivateEntity(createPrivateEntity_inputEntityName).send({ from: accounts[2] });
  }

  // verifyTranscript
  const [verifyTranscript_inputStudentAddress, verifyTranscript_setInputValueString] = useState("");
  const handle_verifyTranscript_inputStudentAddress = (event) => {
    verifyTranscript_setInputValueString(event.target.value);
  };
  
  const [verifyTranscript_inputCourseID, verifyTranscript_setInputValueInteger] = useState("");
  const handle_verifyTranscript_inputCourseID = (event) => {
    const value = parseInt(event.target.value);
    verifyTranscript_setInputValueInteger(isNaN(value) ? 0 : value);
  }

  const verifyTranscript = async e => {
    console.log("String Input Student Address:", verifyTranscript_inputStudentAddress);
    console.log("String Input Course ID:", verifyTranscript_inputCourseID);
    await contract_ExternalVerifier.methods.verifyTranscript(verifyTranscript_inputStudentAddress, verifyTranscript_inputCourseID).send({ from: accounts[2] });
  }

  return (
    <div className="btns">
      <div>
        {/* for padding */}
      </div>

      {/* createPrivateEntity */}
      <div>
        <input
          type="text"
          placeholder="Private Entity Name"
          value={createPrivateEntity_inputEntityName}
          onChange={handle_createPrivateEntity_inputEntityName}
        />
        <button onClick={createPrivateEntity}>Enter private entity name</button>
      </div>

      {/* verifyTranscript */}
      <div>
      <input
          type="text"
          placeholder="Student Address"
          value={verifyTranscript_inputStudentAddress}
          onChange={handle_verifyTranscript_inputStudentAddress}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={verifyTranscript_inputCourseID}
          onChange={handle_verifyTranscript_inputCourseID}
        />
        <button onClick={verifyTranscript}>Verify student transcript</button>
      </div>

      
    </div>
  );
}

export default PrivateContractBtns;
