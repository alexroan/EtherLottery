pragma solidity ^0.5.8;

contract Lottery {

    //Rounds of lottery
    enum LotteryState { FirstRound, SecondRound, Finished }

    mapping (uint8 => address[]) playersByNumber;
    mapping (address => bytes32) playersHash;

    uint8 winningNumber;
    uint8[] public numbers;
    address owner;
    LotteryState state;

    //Constructor
    constructor () public {
        owner = msg.sender;
        state = LotteryState.FirstRound;
    }

    //Owner only modifier
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can do this.");
        _;
    }

    //Enter hash of guessed number
    function enterHash(bytes32 x) public payable {
        require(state == LotteryState.FirstRound, "Must be first round");
        require(msg.value > .001 ether, "Must be at least 0.001 Eth");
        playersHash[msg.sender] = x;
    }

    //Owner runs the second round of the lottery
    function runSecondRound() public onlyOwner {
        require(state == LotteryState.FirstRound, "Must be first round");
        state = LotteryState.SecondRound;
    }

    //Participants enter their original numbers
    function enterNumber(uint8 number) public {
        require(number<=250, "1-250 only");
        require(state == LotteryState.SecondRound, "Must be second round");
        require(keccak256(abi.encodePacked(number, msg.sender)) == playersHash[msg.sender], "Number must be same as chosen");
        playersByNumber[number].push(msg.sender);
        numbers.push(number);
    }

    //Owner determines winner
    function determineWinner() public onlyOwner{
        state = LotteryState.Finished;
        winningNumber = random();
    }


    function getWinners() public view returns (address[] memory) {
        require(state == LotteryState.Finished, "LotteryState needs to be finished");
        return playersByNumber[winningNumber];
    }

    function random() private view returns (uint8) {
        uint8 randomNumber = numbers[0];
        for (uint8 i = 1; i < numbers.length; ++i) {
            randomNumber ^= numbers[i];
        }
        return randomNumber;
    }
}