const RegulatedEntity = artifacts.require("RegulatedEntity");

module.exports = function (deployer) {
  deployer.deploy(RegulatedEntity);
};
