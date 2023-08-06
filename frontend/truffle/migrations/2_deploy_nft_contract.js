const NFTContract = artifacts.require("NFTContract");

module.exports = function (deployer) {
  const name = "MyNFTs"; // Replace with your desired contract name
  const symbol = "MNFT"; // Replace with your desired contract symbol
  deployer.deploy(NFTContract, name, symbol);
};