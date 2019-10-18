const ethers = require('ethers');

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  state: {
    lotteryNumber: 0,
    lotteryHash: '0x0',
    round: 0, //0,1,2
    jackpot: 0 //ether
  },

  init: async function() {
    await App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      // await permission from the blockchain first.
      await ethereum.enable();
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    App.initContract();
  },

  initContract: function() {
    $.getJSON("Lottery.json", function (lottery) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Lottery = TruffleContract(lottery);
      // Connect provider to interact with contract
      App.contracts.Lottery.setProvider(App.web3Provider);

      App.listenForEvents();
    });  
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Lottery.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.SecondRound({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("Second round event triggered", event);
        // Send actual number once second round is triggered
        // App.submitActualNumber();
      });
    });
  },

  enterNumber: function() {
    console.log("entering number");
    console.log(web3.eth.accounts[0]);
    lotteryNumber = $('#lotteryNumber').val();
    lotteryHash = ethers.utils.solidityKeccak256(['uint8', 'address'], [lotteryNumber, punter1]);
  },

  startSecondRound: function() {
    console.log("starting second round");
  },

  determineWinner: function() {
    console.log("determining winner");
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
