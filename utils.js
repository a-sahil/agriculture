"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
    addressRegistry,
    comoditiesContract,
    abiRegistry,
    abiComodities,
    Sender,
    reciever,
    abiSender,
    abiReciever
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

export async function getComoditiesContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
        comoditiesContract,
        abiComodities,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            comoditiesContract,
            abiComodities,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getSenderContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
        Sender,
        abiSender,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            Sender,
            abiSender,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getRecieverContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
        reciever,
        abiReciever,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            reciever,
            abiReciever,
            signer
        );
        return contract;
    }
    return contract;
}

// register function

export async function register(_area, _state, _country ){
    const contract = await getRegistryContract(true);
    const tx = await contract.farmerRegister(_area, _state, _country );
    await tx.wait();
    console.log("Farmer registered");
}


export async function verifyFarmer(_farmerId){
    const contract = await getRegistryContract(true);
    const tx = await contract.verifyFarmer(_farmerId);
    await tx.wait();
    console.log("farmerAddress: " + _farmerId + " verified");
}

export async function callRequestClaim(){
    const contract = await getRegistryContract(true);
    const tx = await contract.callRequestClaim();
    await tx.wait();
    console.log("farmer requested for claim");
    console.log(tx);
    return tx;
}

export async function callClaim(){
    const contract = await getRegistryContract(true);
    const tx = await contract.callClaim();
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

export async function fetchTotalFarmer() {
    const contract = await getRegistryContract();
    const address = await getUserAddress();
    const data = await contract.farmerId();
    console.log("dao id", data);
    return data;
}

export async function buyerStake(amount){
    const contract = await getRegistryContract(true);
    const tx = await contract.buyerStake(amount);
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function getStakeAmount() {
    const contract = await getRegistryContract();
    const address = await getUserAddress();
    const data = await contract.getStake(address);
    console.log("dao id", data);
    return data;
}

export async function getArea() {
    const contract = await getRegistryContract();
    const address = await getUserAddress();
    const data = await contract.getArea(address);
    console.log("dao id", data);
    return data;
}


export async function addCrop(cropName, price, quantity){
    const contract = await getRegistryContract(true);
    const tx = await contract.addCrop(cropName, price, quantity);
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function getAllCrop(){
    const contract = await getRegistryContract();
    const data = await contract.getAllCrop();

    const items = await Promise.all(
        data.map(async (i) => {
            let item = {

                cropId: i.cropId.toString(),
                buyerAddress: i.buyerAddress.toString(),
                sellerAddress: i.sellerAddress.toString(),
                cropName: i.cropName.toString(),
                quantity: i.quantity.toString(),
                price: i.price.toString()
            };
            return item;
        })
    );

    console.log("crop's Fetched ", items);
    return items;
}

export async function sell(_cropId){
    const contract = await getRegistryContract(true);
    const tx = await contract.sell(_cropId);
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function cropRecieved(_cropId, _value){
    const contract = await getRegistryContract(true);
    const tx = await contract.cropRecieved(_cropId, _value);
    await tx.wait();
    console.log("buyer registered and staked");
}


export async function setMsp(cropName, _msp){
    const contract = await getRegistryContract(true);
    const tx = await contract.setMsp(cropName, _msp);
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function withdrawStake(){
    const contract = await getRegistryContract(true);
    const tx = await contract.withdrawStake();
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function fetchTotalCrop() {
    const contract = await getRegistryContract();
    const address = await getUserAddress();
    const data = await contract.cropId();
    console.log("dao id", data);
    return data;
}

export async function cropToMsp(cropName) {
    const contract = await getRegistryContract();
    const address = await getUserAddress();
    const data = await contract.cropToMSP(cropName);
    console.log("dao id", data);
    return data;
}

// ----------------------------------------------------------------


export async function borrowRequest(_itemName, _timePeriod){
    const contract = await getComoditiesContract(true);
    const tx = await contract.borrowRequest(_itemName, _timePeriod);
    await tx.wait();
    console.log("buyer registered and staked");
}

export async function setPrice(_requestId, _price){
    const contract = await getComoditiesContract(true);
    const tx = await contract.setPrice(_requestId, _price);
    await tx.wait();
    console.log("buyer registered and staked");
}


// export async function AcceptRequest(_value){
//     const contract = await getComoditiesContract(true);
//     const tx = await contract.AcceptRequest(_value);
//     await tx.wait();
//     console.log("buyer registered and staked");
// }


export async function getAllRequest(){
    const contract = await getComoditiesContract(true);
    const data = await contract.getAllRequest();

    const items = await Promise.all(
        data.map(async (i) => {
            let item = {

                requestId: i.requestId.toString(),
                borrowerAddress: i.borrowerAddress.toString(),
                sellerAddress: i.sellerAddress.toString(),
                _itemName: i._itemName.toString(),
                _timePeriod: i._timePeriod.toString(),
                price: i.price.toString(),
                requestAccept: i.requestAccept.toString()
            };
            return item;
        })
    );

    console.log("request's Fetched ", items);
    return items;
}

export async function fetchTotalRequests() {
    const contract = await getComoditiesContract();
    const address = await getUserAddress();
    const data = await contract.requestId();
    console.log("dao id", data);
    return data;
}

//------------------------------------------------------------------

export async function getAllRentals(){
    const contract = await getSenderContract(true);
    const data = await contract.getAllRentals();

    const items = await Promise.all(
        data.map(async (i) => {
            let item = {

                rentalId: i.rentalId.toString(),
                owner: i.owner.toString(),
                renter: i.renter.toString(),
                rentAmount: i.rentAmount.toString(),
                rentDuration: i.rentDuration.toString(),
                rentStartTime: i.rentStartTime.toString(),
                area: i.area.toString(),
                lastPayment : i.lastPayment.toString()
            };
            return item;
        })
    );

    console.log("request's Fetched ", items);
    return items;
}


export async function start(
    rentAmount, 
    rentDuration, 
    area
    ){
    const contract = await getSenderContract(true);
    const tx = await contract.start( 
        rentAmount, 
        rentDuration, 
        area, 
        "16281711391670634445", 
        "0x5f93699d11bc00c45d3d90184cc079a5cd6e4bd7"
    );
    await tx.wait();
    console.log("buyer registered and staked");
}


export async function acceptRental(
    rentId, 
    _amount,
    ){
    const contract = await getRecieverContract(true);
    const tx = await contract.acceptRental( 
        rentId, 
        _amount, 
        "0xcab0EF91Bee323d1A617c0a027eE753aFd6997E4", 
        "13264668187771770619", 
        "0x2DdE505706c4711c465c79B5568CC2C50454Ece9"
    );
    await tx.wait();
    console.log("buyer registered and staked");
}


export async function getLastReceivedMessageDetails(){
    const contract = await getRecieverContract();
    const tx = await contract.getLastReceivedMessageDetails();
    await tx.wait();
    console.log(tx);
}

export async function gameSessions(id){
    const contract = await getRecieverContract();
    const tx = await contract.gameSessions(id);
    await tx.wait();
    console.log(tx);

}
