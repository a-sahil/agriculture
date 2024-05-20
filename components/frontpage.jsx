// FrontPage.tsx
"use client";

import React from 'react';
import { WebSocketProvider, Contract } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { getUserAddress,
  register,
  verifyFarmer,
  callRequestClaim,
  callClaim,
  getAllFarmers
} from "../utils";
import { comoditiesContract , addressRegistry } from "../config";


export default function Frontpage() {

    async function getUserAddressCall(){ 
        const data = await getUserAddress();
    } 
    async function registerCall(){
      const data = await register("10000","mumbai", "maharastra");
    }

    async function verifyFarmerCall(){
      const data = await verifyFarmer("2");
      await eveFarmerVerified();
      
    }
    async function requestClaimCall(){
      const data = await callRequestClaim();
    }

    async function claimCall(){
      const data = await callClaim();
      await evefarmerClaimed();
      await eveFarmerFakeclaimed();
    }

    async function getAllFarmersCall(){
      const data = await getAllFarmers();
  }

  async function eveFarmerVerified() {
      const providerUrl =
        "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";
  
      const eventABI = [
        {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "farmeraddress",
            "type": "address"
          }
        ],
        "name": "farmerVerified",
        "type": "event"
        },
      ]

      const provider = new WebSocketProvider(providerUrl);

      const contract = new Contract(addressRegistry, eventABI, provider);
      contract.on("farmerVerified",(farmeraddress) => {
        console.log(
          "result:",`${farmeraddress}`
        );
      });
  }

  async function evefarmerClaimed() {
    const providerUrl =
      "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";

    const eventABI = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "farmeraddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "farmerClaimed",
        "type": "event"
      },
    ]

    const provider = new WebSocketProvider(providerUrl);

    const contract = new Contract(addressRegistry, eventABI, provider);
    contract.on("farmerClaimed",(farmeraddress, amount) => {
      console.log(
        "result:",
        `${farmeraddress} successfully claimed ${amount}`
      );
    });
}

  async function eveFarmerFakeclaimed() {
  const providerUrl =
    "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";

  const eventABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "farmeraddress",
          "type": "address"
        }
      ],
      "name": "fakeClaim",
      "type": "event"
    },
  ]

  const provider = new WebSocketProvider(providerUrl);

  const contract = new Contract(addressRegistry, eventABI, provider);
  contract.on("fakeClaim",(farmeraddress) => {
    console.log(
      "result:",
      `${farmeraddress} tried to fake Claim`
    );
  });
}

async function evePriceSet() {
  const providerUrl =
    "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";

  const eventABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "borrowerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sellerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "priceSet",
      "type": "event"
    },
  ]

  const provider = new WebSocketProvider(providerUrl);

  const contract = new Contract(comoditiesContract, eventABI, provider);
  contract.on("priceSet",(borrowerAddress, sellerAddress, price) => {
    console.log(
      "result:",
      `${borrowerAddress} ${sellerAddress}  ${price} priceSet`
    );
  });
}

async function eveRequestAccepted() {
  const providerUrl =
    "wss://quiet-quick-wind.bsc-testnet.quiknode.pro/7593d9a56a9bf68b6e049a867416791b5e1bfdbb/";

  const eventABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "borrowerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sellerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "requestAccepted",
      "type": "event"
    },
  ]

  const provider = new WebSocketProvider(providerUrl);

  const contract = new Contract(comoditiesContract, eventABI, provider);
  contract.on("requestAccepted",(borrowerAddress, sellerAddress, price) => {
    console.log(
      "result:",
      `${borrowerAddress} ${sellerAddress}  ${price} requestAccepted`
    );
  });
}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Welcome to my Project</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={getUserAddressCall}>
          Button 1
        </button>
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={registerCall}>
          Button 2
        </button>
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={verifyFarmerCall}>
          Button 3
        </button>
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={requestClaimCall}>
          Button 4
        </button>
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={claimCall}>
          Button 5
        </button>
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={getAllFarmersCall}>
          Button 6
        </button>
        <div className="flex items-center ml-3">
            <ConnectButton chainStatus="icon" accountStatus="avatar"/>
        </div>
      </div>
    </div>
  );
};

