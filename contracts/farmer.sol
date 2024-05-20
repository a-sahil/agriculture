// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./Imuavza.sol";


contract registry{
    address public muavza;
    Imuavza muavzaContract;
    IERC20 token;
    address owner;


    constructor(address muavzaContractAddress){
        token = IERC20(0x91E714f998B1AAe75b133E0467b5FAA2783f5D0A);
        muavza = muavzaContractAddress;
        muavzaContract = Imuavza(address(muavza));
        owner = msg.sender;
    }

    uint256 public constant FACTOR = 1000000;  
    uint256 public constant USABLESTAKE = 70;

    uint256 public farmerId = 0;
    uint256 public buyerId = 0;
    uint256 public cropId = 0;

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
        // string cropName;
        // uint256 price;
        // mapping (string => uint256) cropToPrice;
    }
    struct Crop{
        uint256 cropId;
        address farmerAddress;
        string cropName;
        uint256 quantity;
        uint256 price;
    }

    mapping (address => bool) public isVerifier;
    mapping (uint256 => Farmer) public IdToFarmer;
    mapping (address => uint256) public addressToId;
    // mapping (address => mapping (string => uint256)) public farmerToCropToPrice;
    mapping (uint256 => Crop) public idTocrop;
    mapping (address => uint256) public addressToCropId;


    struct Buyer{
        uint256 buyerId;
        address buyerAddress;
        uint256 stakedAmount;
        uint256 useableStake;
        // string cropName;
        // quantity;
        // mapping (string => uint256) cropToQuntity;
    }

    mapping (uint256 => Buyer) public IdTobuyer;
    mapping (address => uint256) public buyerAddressToId;
    // mapping (address => mapping (string => uint256)) public buyerToCropToQuantity;

    mapping (string => uint256) public cropToMSP;

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

    function farmerRegister(uint256 _area, string memory _state, string memory _country) public {
        uint256 farmerid = addressToId[msg.sender];
        require(farmerid != 0, "already regestered");
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

    function callRequestClaim() public returns (bytes32) {
        Farmer storage farmer = IdToFarmer[addressToId[msg.sender]] ;
        require(farmer.isVerified == true, "only for verified farmers");
        farmer.requestedClaim = true;
        bytes32 requestId = muavzaContract.requestClaim(farmer.state);
        return requestId;
    }

    function callClaim() public {
    Farmer storage farmer = IdToFarmer[addressToId[msg.sender]] ;
        require( farmer.requestedClaim == true, "only for verified farmers");
        require( farmer.hasClaimed == false, "only for verified farmers");
        // bool result = apiContract.getValue(farmer.requestId);
        bool result = muavzaContract.claim(farmer.requestId);
        require(result == true, "false claimdone by farmer");
        if(result){
            farmer.hasClaimed = true;
            token.transfer(msg.sender, (farmer.area * FACTOR));
            emit farmerClaimed(msg.sender, (farmer.area * FACTOR));
        }else{
            emit fakeClaim(msg.sender);
        }
    }


    function _buyerRegister() internal {
        buyerId++;
        IdTobuyer[buyerId] = Buyer(
            buyerId,
            msg.sender,
            0,
            0
        );
        buyerAddressToId[ msg.sender] = buyerId;

    }

    function buyerStake(uint256 amount) public {
       buyerId = buyerAddressToId[ msg.sender];
       require(buyerId != 0, "already regestered");
        _buyerRegister();
       Buyer storage buyer  = IdTobuyer[buyerId];
        token.approve(address(this), amount);
       token.transferFrom(msg.sender, address(this), amount);
       buyer.stakedAmount += amount;
       buyer.useableStake += (amount * USABLESTAKE)/100;
    }

    function addCrop(string memory cropName, uint256 price, uint256 quantity) public {
        cropId++;
        idTocrop[cropId] =
        Crop(
            cropId,
            msg.sender,
            cropName,
            quantity,
            price
        );
        addressToCropId[msg.sender] = cropId;
    }

    function getAllCrop() public view returns(Crop[] memory) {
        uint counter = 0;
        Crop[] memory crop = new Crop[](cropId);
         for (uint i = 1; i <= cropId; i++) {
            Crop memory currentItem = idTocrop[i];
            crop[counter] = currentItem;
            counter++;
        }
        return crop;
    }

    function getBuyerBalance() public returns (uint256) {
        buyerId = buyerAddressToId[ msg.sender];
       Buyer memory buyer  = IdTobuyer[buyerId];
       return buyer.useableStake;
    }

    function buy(uint256 _cropId, uint256 _quantity) public {
        buyerId = buyerAddressToId[ msg.sender];
        Buyer storage buyer  = IdTobuyer[buyerId];
        require(buyer.useableStake > 0, "avalible balance is less, Stake more" );
        Crop storage crop = idTocrop[_cropId];
        require(crop.quantity > _quantity, "Enter less Quantity");
        uint256  value = _quantity * crop.price;
        require(buyer.useableStake > value, "avalible balance is less, Stake more" );
        token.transferFrom(address(this), crop.farmerAddress, value);
        crop.quantity -= _quantity;
        buyer.useableStake -= value;
    }

    function withdrawStake() public {
        buyerId = buyerAddressToId[ msg.sender];
        Buyer memory buyer  = IdTobuyer[buyerId];
        uint256 value = buyer.useableStake + (buyer.stakedAmount * 30)/100;
        require(
            token.transfer(msg.sender, value),
            "Unable to transfer"
        );
    }

    function setmsp(string memory cropName, uint256 _msp) public onlyOwner{
        cropToMSP[cropName] = _msp;
    }

}