var Migrations = artifacts.require("./Lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};