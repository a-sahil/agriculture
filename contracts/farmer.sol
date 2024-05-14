
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./IAPITest.sol";

contract dao {

      address public apiTest;
    IAPITest apiContract; 

    IERC20 token;
    address owner;
    uint256 public constant FACTOR = 1000000;  
    uint256 farmerId = 0;

    string dataUrl = "restapt-production.up.railway.app"; 

    constructor(address apiContractAddress){
        token = IERC20(0x91E714f998B1AAe75b133E0467b5FAA2783f5D0A);
        apiTest = apiContractAddress;
        apiContract = IAPITest(address(apiTest));
        owner = msg.sender;
    }

    struct Farmer{
        uint256 farmerId;
        address farmerAddress;
        uint256 area;
        string state;
        string country;
        bytes32 requestId;
        bool requestedClaim;
        bool hasClaimed;
        bool isVerified;
    }

    // farmer[] public farmerArray;
    mapping (address => bool) public isVerifier;
    mapping (uint256 => Farmer) public IdToFarmer;
    mapping (address => uint256) public addressToId;

    event farmerVerified(address farmeraddress);
    event farmerClaimed(address farmeraddress, uint256 amount);
    event fakeClaim(address farmeraddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function verifyUsers(address verifier) public onlyOwner {
        isVerifier[verifier] = true;
    }

    function register(uint256 _area, string memory _state, string memory _country) public {
        farmerId++;
        IdToFarmer[farmerId] = 
            Farmer(
                farmerId,
                msg.sender,
                _area,
                _state,
                _country,
                0,
                false,
                false,
                false
        );
        addressToId[msg.sender] = farmerId;

    }

    function verifyFarmer(uint256 _farmerId) public {
        require(isVerifier[msg.sender] == true , " only verifier can verify " );
        Farmer storage farmer = IdToFarmer[_farmerId] ;
        farmer.isVerified = true;
        emit farmerVerified(farmer.farmerAddress);   
    }

    function concatenate(string memory s1, string memory s2) public pure returns (string memory) {
        return string.concat(s1,s2);
    }

    function requestClaim() public returns (bytes32) {
        Farmer storage farmer = IdToFarmer[addressToId[msg.sender]] ;
        require(farmer.isVerified == true, "only for verified farmers");
        farmer.requestedClaim = true;
        string memory mainurl = concatenate(dataUrl,farmer.state);
        bytes32 requestId = apiContract.requesttestData(mainurl);
        farmer.requestId = requestId;
        return requestId;
    }

    function claim() public {
        Farmer storage farmer = IdToFarmer[addressToId[msg.sender]] ;
        require( farmer.requestedClaim == true, "only for verified farmers");
        require( farmer.hasClaimed == false, "only for verified farmers");
        bool result = apiContract.getValue(farmer.requestId);
        require(result == true, "false claimdone by farmer");
        if(result){
            farmer.hasClaimed = true;
            token.transfer(msg.sender, (farmer.area * FACTOR));
            emit farmerClaimed(msg.sender, (farmer.area * FACTOR));
        }else{
            emit fakeClaim(msg.sender);
        }
    }

    function updateApiValue(bool _result) public pure returns (bool) {
        return _result;
    }

    function claimfake(bool _result) public {
        Farmer storage farmer = IdToFarmer[addressToId[msg.sender]] ;
        require( farmer.requestedClaim == true, "only for verified farmers");
        require( farmer.hasClaimed == false, "only for verified farmers");
        bool result = updateApiValue(_result);
        if(result){
            farmer.hasClaimed = true;
            token.transfer(msg.sender, (farmer.area * FACTOR));
            emit farmerClaimed(msg.sender, (farmer.area * FACTOR));
        }
    }

    function withdrawToken() public onlyOwner {
        require(
            token.transfer(msg.sender, token.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function getAllFarmers() public view returns(Farmer[] memory) {
        uint counter = 0;
        Farmer[] memory farmer = new Farmer[](farmerId);
         for (uint i = 1; i <= farmerId; i++) {
            Farmer memory currentItem = IdToFarmer[i];
            farmer[counter] = currentItem;
            counter++;
        }
        return farmer;

    }

}