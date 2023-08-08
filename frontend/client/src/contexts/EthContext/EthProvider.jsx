import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (
      artifact_simpleStorage,
      artifact_platformEntity,
      artifact_regulatedEntity,
      artifact_NFTContract,
      artifact_ExternalVerifier
    ) => {
      if (
        artifact_simpleStorage &&
        artifact_platformEntity &&
        artifact_regulatedEntity &&
        artifact_NFTContract &&
        artifact_ExternalVerifier
      ) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

        // Initialize each smart contract and its address
        const { abi: abi_simpleStorage } = artifact_simpleStorage;
        let address_simpleStorage, contract_simpleStorage;
        try {
          address_simpleStorage = artifact_simpleStorage.networks[networkID].address;
          contract_simpleStorage = new web3.eth.Contract(abi_simpleStorage, address_simpleStorage);
        } catch (err) {
          console.error(err);
        }

        // PlatformEntity
        const { abi: abi_platformEntity } = artifact_platformEntity;
        let address_platformEntity, contract_platformEntity;
        try {
          address_platformEntity = artifact_platformEntity.networks[networkID].address;
          contract_platformEntity = new web3.eth.Contract(abi_platformEntity, address_platformEntity);
        } catch (err) {
          console.error(err);
        }

        // RegulatedEntity
        const { abi: abi_regulatedEntity } = artifact_regulatedEntity;
        let address_regulatedEntity, contract_regulatedEntity;
        try {
          address_regulatedEntity = artifact_regulatedEntity.networks[networkID].address;
          contract_regulatedEntity = new web3.eth.Contract(abi_regulatedEntity, address_regulatedEntity);
        } catch (err) {
          console.error(err);
        }

        // NFTContract
        const { abi: abi_NFTContract } = artifact_NFTContract;
        let address_NFTContract, contract_NFTContract;
        try {
          address_NFTContract = artifact_NFTContract.networks[networkID].address;
          contract_NFTContract = new web3.eth.Contract(abi_NFTContract, address_NFTContract);
        } catch (err) {
          console.error(err);
        }

        // ExternalVerifer
        const { abi: abi_ExternalVerifier } = artifact_regulatedEntity;
        let address_ExternalVerifier, contract_ExternalVerifier;
        try {
          address_ExternalVerifier = artifact_ExternalVerifier.networks[networkID].address;
          contract_ExternalVerifier = new web3.eth.Contract(abi_ExternalVerifier, address_ExternalVerifier);
        } catch (err) {
          console.error(err);
        }

        dispatch({
          type: actions.init,
          data: {
            artifact_simpleStorage,
            artifact_platformEntity,
            artifact_regulatedEntity,
            artifact_NFTContract,
            artifact_ExternalVerifier,
            web3,
            accounts,
            networkID,
            contract_simpleStorage,
            contract_platformEntity,
            contract_regulatedEntity,
            contract_NFTContract,
            contract_ExternalVerifier,
            address_platformEntity,
            address_regulatedEntity,
            address_NFTContract,
            address_ExternalVerifier

            // Add contracts for other smart contracts here
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    const tryInit = async () => {
      try {
        // Load all smart contract artifacts
        const artifact_simpleStorage = require("../../contracts/SimpleStorage.json");
        const artifact_platformEntity = require("../../contracts/PlatformEntity.json");
        const artifact_regulatedEntity = require("../../contracts/RegulatedEntity.json");
        const artifact_NFTContract = require("../../contracts/NFTContract.json");
        const artifact_ExternalVerifier = require("../../contracts/ExternalVerifier.json");

        // Call init with all the smart contract artifacts
        init(
          artifact_simpleStorage,
          artifact_platformEntity,
          artifact_regulatedEntity,
          artifact_NFTContract,
          artifact_ExternalVerifier
        );
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      // Call init with all the smart contract artifacts in case of changes
      init(
        state.artifact_simpleStorage,
        state.artifact_platformEntity,
        state.artifact_regulatedEntity,
        state.artifact_NFTContract,
        state.artifact_ExternalVerifier
      );
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [
    init,
    state.artifact_simpleStorage,
    state.artifact_platformEntity,
    state.artifact_regulatedEntity,
    state.artifact_NFTContract,
    state.artifact_ExternalVerifier,
  ]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
