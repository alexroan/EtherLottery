var Lottery = artifacts.require('./Lottery.sol');

contract("Lottery", function(accounts) {
    const owner = accounts[0];
    const punter1 = accounts[1];
    it("Full run through", function() {
        Lottery.deployed().then(function(instance) {
            
        });
    });
});