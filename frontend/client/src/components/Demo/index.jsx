import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();

  const demo =
    <>
      <div className="contract-container">
        <ContractBtns />
      </div>
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact_simpleStorage ? <NoticeNoArtifact /> :
          !state.contract_simpleStorage ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
