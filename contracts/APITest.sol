// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * THIS EXAMPLE USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    bool public test;
    bytes32 private jobId;
    uint256 private fee;
    bytes32 public currentRequestId;

    mapping (bytes32 => bool) public requestIdToresult;

    event Requesttest(bytes32 indexed requestId, bool test);

    /**
     * @notice Initialize the link token and target oracle
     *
     * Sepolia Testnet details:
     * Link Token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
     * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD (Chainlink DevRel)
     0xCC79157eb46F5624204f47AB42b3906cAA40eaB7
     * jobId: ca98366cc7314957b8c012c72f05aeeb
     7d80a6386ef543a3abb52817f6707e3b
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        _setChainlinkToken(0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06);
        _setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requesttestData(string memory _dataurl) public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        req._add(
            "get",
            // "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD"
            // "https://web-production-f8af.up.railway.app/weatherData");
            _dataurl);

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "test24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        // request.add("path", "RAW.ETH.USD.test24HOUR"); // Chainlink nodes prior to 1.0.0 support this format
        // req._add("path", "RAW,ETH,USD,test24HOUR"); // Chainlink nodes 1.0.0 and later support this format

        // // Multiply the result by 1000000000000000000 to remove decimals
        // int256 timesAmount = 10 ** 18;
        // req._addInt("times", timesAmount);
        req._add("path", "data");
        // Sends the request
        currentRequestId = _sendChainlinkRequest(req, fee);
        return _sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        bool _test
    ) public recordChainlinkFulfillment(_requestId) {
        requestIdToresult[_requestId] = _test;
        emit Requesttest(_requestId, _test);
        test = _test;
    }


    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(_chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
    function getCurrentRequestId() public view returns (bytes32){
        return currentRequestId;
    }

    function getValue(bytes32 _requestId) public view returns( bool ){
        bool _test = requestIdToresult[_requestId];
        return _test;
    }
}
