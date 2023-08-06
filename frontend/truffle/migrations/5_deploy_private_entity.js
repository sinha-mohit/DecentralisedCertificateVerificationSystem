const RegulatedEntity = artifacts.require("RegulatedEntity");
const ExternalVerifier = artifacts.require("ExternalVerifier");

module.exports = async function (deployer) {
  // Deploy the RegulatedEntity contract
  await deployer.deploy(RegulatedEntity);

  // Get the deployed RegulatedEntity contract instance
  const regulatedEntityInstance = await RegulatedEntity.deployed();

  // Get the deployed RegulatedEntity contract address
  const regulatedEntityContractAddress = regulatedEntityInstance.address;

  // Deploy the ExternalVerifier contract with the RegulatedEntity contract address
  await deployer.deploy(ExternalVerifier, regulatedEntityContractAddress);
};
