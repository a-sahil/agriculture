"use client"; 

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Footer from "../components/footer";
import Modal from "../components/Modal"; 
import AddCrop from "./addCrops";

const Header = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="p-page my-3 flex items-stretch">
      
      <div
        className="relative flex h-max basis-2/3 items-end before:absolute before:bottom-0 before:left-0 before:-z-1 before:h-[90%] before:w-[95%] before:rounded-3xl before:bg-primary before:bg-opacity-70 before:content-visible"
      >
        <div className="flex bg-[#63ba82] relative left-40 top-36 px-52 p-2 rounded-2xl">
          <div className="w-min pb-6 pl-10 pt-6 relative right-44">
            <h1 className="whitespace-nowrap text-xl font-semibold tracking-wider text-back relative text-[#fefffe]">
              Welcome Back to Agrosurance
            </h1>
            <p className="my-3 text-xs font-medium text-back text-opacity-80 text-[#fefffe]">
              We hope you and your crops are doing absolutely wonderful! Just
              in case anything has gone south, do make a claim for it.
              <br />
              Make sure you have all your farmlands registered and insured with
              us.
            </p>
            <button className="rounded-md bg-secondary px-4 py-1 font-medium text-back shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110 bg-[#ebab2d] text-white">
              Learn More
            </button>
          </div>
        </div>
        <div
          className="pointer-events-none relative h-full flex-1 selection:hidden"
          draggable={false}
        >
          <div className="absolute left-0 top-0 z-1 h-full w-full content-visible" />
          <img
            src="/images/dashboard-banner-cutout.png"
            alt="farmers USA INDIA CHINA"
            className="relative right-28 top-36 pointer-events-none object-bottom selection:hidden w-96 h-64"
            draggable={false}
          />
        </div>
      </div>

      <div className="h-10 px-10 py-5 relative left-72 text-3xl text-semibold text-green hover:text-green-800">
        Staker
      </div>
      <div className="flex max-h-full min-h-full flex-1 flex-col items-center justify-between relative top-32 right-24 ">
        <button
          className="flex items-center justify-between rounded-xl bg-primary bg-opacity-20 p-3 px-0 text-2xl text-primary duration-300 hover:bg-opacity-70 hover:text-back bg-[#7afaa5] hover:bg-[#63ba82] relative top-20"
          onClick={() => router.push("/claim")}
        >
          <img
            src="/images/placeholder-land.png"
            alt="land"
            className="w-[25%]"
          />
          <h3 className="font-raleway font-semibold tracking-tight relative right-10">
            Request Claim
          </h3>
        </button>
        <button className="relative flex items-center justify-between rounded-xl bg-secondary bg-opacity-20 p-3 px-0 text-2xl text-secondary duration-300 hover:bg-opacity-70 hover:text-back bg-[#f3c259] hover:bg-[#ebab2d]"
         onClick={() => setShowModal(true)}
        >
          <img src="/images/ruined-land.png" alt="land" className="w-[25%]" />
          <h3 className="font-raleway font-semibold tracking-tight relative right-10">
            Add Crop
          </h3>
        </button>

      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false) } >
        <div>{AddCrop()}</div>
      </Modal>
    
      <Footer />
    </header>
  );
}

export default Header;
