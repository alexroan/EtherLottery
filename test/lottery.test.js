const Lottery = artifacts.require('./Lottery.sol');
const ethers = require('ethers');

contract("Lottery", async function(accounts) {
    const owner = accounts[0];
    const punter1 = accounts[1];
    const punter1Number = 10;
    const punter2 = accounts[2];
    const punter2Number = 9;
    const punter3 = accounts[3];
    const punter3Number = 10;

    it("Gets the current round", async () => {
        const lottery = await Lottery.deployed();
        var round = await lottery.getRound();
        console.log(round);
        await lottery.runSecondRound({from: owner});
        round = await lottery.getRound();
        console.log(round);
    });

    it("Performs a full run through", async () => {
        const lottery = await Lottery.deployed();
        punter1Hash = ethers.utils.solidityKeccak256(['uint8', 'address'], [punter1Number, punter1]);
        punter2Hash = ethers.utils.solidityKeccak256(['uint8', 'address'], [punter2Number, punter2]);
        punter3Hash = ethers.utils.solidityKeccak256(['uint8', 'address'], [punter3Number, punter3]);

        await lottery.enterHash(punter1Hash, {from: punter1, value: 1000000000000000000});
        await lottery.enterHash(punter2Hash, {from: punter2, value: 1000000000000000000});
        await lottery.enterHash(punter3Hash, {from: punter3, value: 1000000000000000000});

        await lottery.runSecondRound({from: owner});

        await lottery.enterNumber(punter1Number, {from: punter1});
        await lottery.enterNumber(punter2Number, {from: punter2});
        await lottery.enterNumber(punter3Number, {from: punter3});

        await lottery.determineWinner({from: owner});

        var winners = await lottery.getWinners({from: owner});
        assert.equal(winners[0], punter2);

    });
});