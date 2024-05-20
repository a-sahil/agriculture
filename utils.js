"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
    addressRegistry,
    abiRegistry,
    abiAPIConsumer,
} from "./config";
// import axios from "axios";
// import { create } from "@web3-storage/w3up-client";

// Creating Instances

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    console.log( accounts[0]);
    return accounts[0];
}

export async function getRegistryContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
        addressRegistry,
        abiRegistry,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            addressRegistry,
            abiRegistry,
            signer
        );
        return contract;
    }
    return contract;
}

// register function

export async function register(_area, _state, _country ){
    const contract = await getRegistryContract(true);
    const tx = await contract.register(_area, _state, _country );
    await tx.wait();
    console.log("Farmer registered");
}


export async function verifyFarmer(_farmerId){
    const contract = await getRegistryContract(true);
    const tx = await contract.verifyFarmer(_farmerId);
    await tx.wait();
    console.log("farmerAddress: " + _farmerId + "verified");
}

export async function requestClaim(){
    const contract = await getRegistryContract(true);
    const tx = await contract.requestClaim();
    await tx.wait();
    console.log("farmer requested for claim");
    console.log(tx);
    return tx;
}

export async function claim(){
    const contract = await getRegistryContract(true);
    const tx = await contract.claim();
    await tx.wait();
    console.log("farmer claim verified");
}

export async function getAllFarmers(){
    const contract = await getRegistryContract(true);
    const data = await contract.getAllFarmers();

    const items = await Promise.all(
        data.map(async (i) => {
            let item = {

                farmerId: i.farmerId.toString(),
                farmerAddress: i.farmerAddress.toString(),
                area: i.area.toString(),
                state: i.state.toString(),
                country: i.country.toString(),
                requestId: i.requestId.toString(),
                requestedClaim: i.requestedClaim.toString(),
                hasClaimed: i.hasClaimed.toString(),
                isVerified: i.isVerified
            };
            return item;
        })
    );

    console.log("Dao's Fetched ", items);
    return items;
}