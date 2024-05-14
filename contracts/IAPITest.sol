// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IAPITest {

    function requesttestData(string memory _dataurl) external returns (bytes32 requestId) ;

     function getValue(bytes32 _requestId) external view returns(bool);

}