const PrivateEntity = artifacts.require("PrivateEntity");

module.exports = function (deployer) {
  deployer.deploy(PrivateEntity);
};
