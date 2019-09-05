var safeMathLibrary = artifacts.require("./SafeMath.sol");
var lotteryContract = artifacts.require("./Lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(safeMathLibrary);
  deployer.link(safeMathLibrary, lotteryContract);
  deployer.deploy(lotteryContract);
};