import useEth from "../../contexts/EthContext/useEth";
import RegulatedEntityTitle from "./RegulatedEntityTitle";
import PrivateEntityTitle from "./PrivateEntityTitle";
import PlatformEntityTitle from "./PlatformEntityTitle";
import RegulatedEntityContractBtns from "./RegulatedEntityContractBtns";
import PrivateEntityContractBtns from "./PrivateEntityContractBtns";
import PlatformEntityContractBtns from "./PlatformEntityContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();

  const demo =
    <>
    <h2>Smart Contracts</h2>
    <details>
      <summary><RegulatedEntityTitle /></summary>
        <div className="contract-container">
          <RegulatedEntityContractBtns />
        </div>
    </details>  
    
    <details>
      <summary><PlatformEntityTitle /></summary>
        <div className="contract-container">
          <PlatformEntityContractBtns />
        </div>
    </details>

    <details>
      <summary><PrivateEntityTitle /></summary>
        <div className="contract-container">
          <PrivateEntityContractBtns />
        </div>
    </details>

   
    </>;

  return (
    <div className="demo">
      {/* <Title /> */}
      {
        !state.artifact_regulatedEntity ? <NoticeNoArtifact /> :
          !state.artifact_regulatedEntity ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
