// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";
import "./rentTokens.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";


/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple messenger contract for sending/receiving string messages across chains.
/// Pay using native tokens (e.g, ETH in Ethereum)
contract TTTDemo is CCIPReceiver, OwnerIsCreator {
    // Custom errors to provide more descriptive revert messages.
    error NoMessageReceived(); // Used when trying to access a message but no messages have been received.
    error IndexOutOfBound(uint256 providedIndex, uint256 maxIndex); // Used when the provided index is out of bounds.
    error MessageIdNotExist(bytes32 messageId); // Used when the provided message ID does not exist.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.

    struct GameSession {
        uint256 rentalId;
        address owner;
        address renter;
        uint256 rentAmount;
        uint256 rentDuration; // in seconds
        uint256 rentStartTime;
        uint256 area;
        uint256 lastPayment;// current status for player 2
    }
    mapping(uint256 => GameSession) public gameSessions;
    uint256[] public sessionIds;
    uint256 rentalId = 0;

    uint8[9] initialCombination = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // function getPlayer1Status(bytes32 _sessionId) external view returns (uint8[9] memory){
    //     return gameSessions[_sessionId].player1Status;
    // }
    // function getPlayer2Status(bytes32 _sessionId) external view returns (uint8[9] memory){
    //     return gameSessions[_sessionId].player2Status;
    // }

    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        GameSession message, // The message being sent.
        uint256 fees // The fees paid for sending the message.
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        GameSession message // The message that was received.
    );

    // Struct to hold details of a message.
    struct Message {
        uint64 sourceChainSelector; // The chain selector of the source chain.
        address sender; // The address of the sender.
        GameSession message;
        // string message;
        address token;
        uint256 amount; // The content of the message.
    }

    // Storage variables.
    bytes32[] public receivedMessages; // Array to keep track of the IDs of received messages.
    mapping(bytes32 => Message) public messageDetail; // Mapping from message ID to Message struct, storing details of each received message.
    address public _router;
    rentTokens public rentalToken;

     IERC20 private s_linkToken;


    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router, address _link) CCIPReceiver(router) {
        s_linkToken = IERC20(_link);
    }
    function updateRouter(address routerAddr) external {
        _router = routerAddr;
    }

    function updateRealtoken(rentTokens realtoken) external {
        rentalToken = realtoken;
    }

    function start(uint256 rentAmount, 
        uint256 rentDuration, 
        uint256 area, uint64 destinationChainSelector, address receiver) external {
        // bytes32 uniqueId = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        rentalId++;
        sessionIds.push(rentalId);
        gameSessions[rentalId]= GameSession(
            rentalId,
            msg.sender,
            address(0),
            rentAmount,
            rentDuration,
            0,
            area,
            0
            );

        rentalToken.mint(msg.sender, area); // Mint rentalAmount token as a representation of the property ownership

        sendMessage(destinationChainSelector, receiver, gameSessions[rentalId] );

    }


    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient native asset (e.g, ETH on Ethereum, MATIC on Polygon...).
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param message The string message to be sent.
    /// @return messageId The ID of the message that was sent.
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        GameSession memory message
    ) public returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(message), // ABI-encoded string message
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 400_000}) // Additional arguments, setting gas limit and non-strict sequency mode
            ),
            feeToken: address(0) // Setting feeToken to zero address, indicating native asset will be used for fees
        });

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(_router);

        // Get the fee required to send the message
        uint256 fees = router.getFee(destinationChainSelector, evm2AnyMessage);

        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend{value: fees}(
            destinationChainSelector,
            evm2AnyMessage
        );

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            message,
            fees
        );

        // Return the message ID
        return messageId;
    }

    // function acceptRental(uint256 rentId,address _token, uint64 destinationChainSelector, address receiver) public {
    //     GameSession storage rental = gameSessions[rentId];
    //     require(rental.owner != address(0), "Invalid rental");
    //     require(rental.renter == address(0), "Already rented");
    //     // require(paymentToken.transferFrom(msg.sender, rental.owner, rental.rentAmount), "Rent payment failed");

    //     // rentalToken.transferFrom(rental.owner, rental.renter, rental.rentAmount);

    //     rental.renter = msg.sender;
    //     rental.rentStartTime = block.timestamp;
    //     rental.lastPayment = block.timestamp;

    //     sendMessage2(_token, rental.rentAmount, destinationChainSelector, receiver, gameSessions[rentalId]);

    // }

    // function sendMessage2(
    //     address _token,
    //     uint256 _amount,
    //     uint64 destinationChainSelector,
    //     address receiver,
    //     GameSession memory message
    // ) public returns (bytes32 messageId) {
    //     // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message

    //     Client.EVMTokenAmount[]
    //         memory tokenAmounts = new Client.EVMTokenAmount[](1);
    //     tokenAmounts[0] = Client.EVMTokenAmount({
    //         token: _token,
    //         amount: _amount
    //     });
    //     Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
    //         receiver: abi.encode(receiver), // ABI-encoded receiver address
    //         data: abi.encode(message), // ABI-encoded string message
    //         tokenAmounts: tokenAmounts, // Empty array indicating no tokens are being sent
    //         extraArgs: Client._argsToBytes(
    //             Client.EVMExtraArgsV1({gasLimit: 400_000}) // Additional arguments, setting gas limit and non-strict sequency mode
    //         ),
    //         feeToken: address(0) // Setting feeToken to zero address, indicating native asset will be used for fees
    //     });

    //     // Initialize a router client instance to interact with cross-chain router
    //     IRouterClient router = IRouterClient(_router);

    //     // Get the fee required to send the message
    //     uint256 fees = router.getFee(destinationChainSelector, evm2AnyMessage);

    //     // Send the message through the router and store the returned message ID
    //     messageId = router.ccipSend{value: fees}(
    //         destinationChainSelector,
    //         evm2AnyMessage
    //     );

    //     // Emit an event with message details
    //     emit MessageSent(
    //         messageId,
    //         destinationChainSelector,
    //         receiver,
    //         message,
    //         fees
    //     );

    //     // Return the message ID
    //     return messageId;
    // }
    

    /// handle a received message
    // function _ccipReceive(
    //     Client.Any2EVMMessage memory any2EvmMessage
    // ) internal override {
    //     bytes32 messageId = any2EvmMessage.messageId; // fetch the messageId
    //     uint64 sourceChainSelector = any2EvmMessage.sourceChainSelector; // fetch the source chain identifier (aka selector)
    //     address sender = abi.decode(any2EvmMessage.sender, (address)); // abi-decoding of the sender address
    //     GameSession memory message = abi.decode(any2EvmMessage.data, (GameSession)); // abi-decoding of the sent string message
    //     receivedMessages.push(messageId);
    //     // Message memory detail = Message(sourceChainSelector, sender, message);
    //     // messageDetail[messageId] = detail;
    //     gameSessions[message.rentalId] = message;
    //     sessionIds.push(message.rentalId);

    //     Client.EVMTokenAmount[] memory tokenAmounts = any2EvmMessage.destTokenAmounts;

    //     address token = tokenAmounts[0].token;
    //     uint256 amount = tokenAmounts[0].amount;

    //     Message memory detail = Message(sourceChainSelector, sender, message, token, amount);
    //     messageDetail[messageId] = detail;

    //     emit MessageReceived(messageId, sourceChainSelector, sender, message);
    // }

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
    // Make sure source chain and sender are allowlisted
    {
        bytes32 messageId = any2EvmMessage.messageId; // fetch the messageId
         GameSession memory message = abi.decode(any2EvmMessage.data, (GameSession)); // abi-decoding of the sent text
        // Expect one token to be transferred at once, but you can transfer several tokens.
        uint64 sourceChainSelector = any2EvmMessage.sourceChainSelector;
        address sender = abi.decode(any2EvmMessage.sender, (address));
    //    Client.EVMTokenAmount[] memory tokenAmounts = any2EvmMessage.destTokenAmounts;

        address token = any2EvmMessage.destTokenAmounts[0].token;
        uint256 amount = any2EvmMessage.destTokenAmounts[0].amount;

        Message memory detail = Message(sourceChainSelector, sender, message, token, amount);
        messageDetail[messageId] = detail;

        // emit MessageReceived(
        //     any2EvmMessage.messageId,
        //     any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
        //     abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
        //     abi.decode(any2EvmMessage.data, (string)),
        //     any2EvmMessage.destTokenAmounts[0].token,
        //     any2EvmMessage.destTokenAmounts[0].amount
        // );
    }

    /// @notice Get the total number of received messages.
    /// @return number The total number of received messages.
    function getNumberOfReceivedMessages()
        external
        view
        returns (uint256 number)
    {
        return receivedMessages.length;
    }

    /// @notice Fetches the details of the last received message.
    /// @dev Reverts if no messages have been received yet.
    /// @return messageId The ID of the last received message.
    /// @return sourceChainSelector The source chain identifier (aka selector) of the last received message.
    /// @return sender The address of the sender of the last received message.
    /// @return message The last received message.
    function getLastReceivedMessageDetails()
        external
        view
        returns (
            bytes32 messageId,
            uint64 sourceChainSelector,
            address sender,
            GameSession memory message
   )
    {
        // Revert if no messages have been received
        if (receivedMessages.length == 0) revert NoMessageReceived();

        // Fetch the last received message ID
        messageId = receivedMessages[receivedMessages.length - 1];

        // Fetch the details of the last received message
        Message memory detail = messageDetail[messageId];

        return (
            messageId,
            detail.sourceChainSelector,
            detail.sender,
            detail.message
        );
    }


    /// @notice Fallback function to allow the contract to receive Ether.
    /// @dev This function has no function body, making it a default function for receiving Ether.
    /// It is automatically called when Ether is sent to the contract without any data.
    receive() external payable {}

    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param beneficiary The address to which the Ether should be sent.
    function withdraw(address beneficiary) public onlyOwner {
        // Retrieve the balance of this contract
        uint256 amount = address(this).balance;

        // Revert if there is nothing to withdraw
        if (amount == 0) revert NothingToWithdraw();

        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent, ) = beneficiary.call{value: amount}("");

        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert FailedToWithdrawEth(msg.sender, beneficiary, amount);
    }

    function getAllRentals() public view returns(GameSession[] memory) {
        uint counter = 0;
        GameSession[] memory farmer = new GameSession[](rentalId);
         for (uint i = 1; i <= rentalId; i++) {
            GameSession memory currentItem = gameSessions[i];
            farmer[counter] = currentItem;
            counter++;
        }
        return farmer;

    }


    function performUpkeep(bytes calldata /* performData */) public {
         for(uint256 i; i > sessionIds.length;i++){
                GameSession storage rental = gameSessions[i];
            require(rental.renter != address(0), "Not rented");
            require(block.timestamp >= rental.lastPayment + 33 days, "rent not payed on time");

            rentalToken.transferFrom(rental.renter, rental.owner, rental.rentAmount);

            rental.renter = address(0);
            rental.rentStartTime = 0;

            // emit RentEnded(rentalId);
        }
    }

}

// 0xd4c92b67D5544F4ED1bD0ed7Edd381d6E7158f89