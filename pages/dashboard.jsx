"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";
import Modal from "../components/Modal";
import Modal2 from "../components/Modal2";
import AddCrop from "./addCrops";
import Borrow from "../components/borrow";
 import AllBorrowReq from "../components/allborrowreq";
import AddLand from "../components/addland";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  return (
    <header className="p-page my-3 flex items-stretch">
      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
        <div className="w-64 h-64 absolute left-0 -top-2 rounded-ee-full bg-gradient-to-r from-[#fee6b7] via-[#fff2da] to-[#fef9ec]"></div>
      </div>
      <div className="relative flex h-max basis-2/3 items-end before:absolute before:bottom-0 before:left-0 before:-z-1 before:h-[90%] before:w-[95%] before:rounded-3xl before:bg-primary before:bg-opacity-70 before:content-visible">
        <div className="flex bg-[#63ba82] relative left-40 top-36 px-52 p-2 rounded-2xl">
          <div className="w-min pb-6 pl-10 pt-6 relative right-44">
            <h1 className="whitespace-nowrap text-xl font-semibold tracking-wider text-back relative text-[#fefffe]">
              Welcome Back to Agrobuddy
            </h1>
            <p className="my-3 text-xs font-medium text-back text-opacity-80 text-[#fefffe]">
              We hope you and your crops are doing absolutely wonderful! Just in
              case anything has gone south, do make a claim for it.
              <br />
              Make sure you have all your farmlands registered and claim with
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
            className="relative right-64 top-36 pointer-events-none object-contain selection:hidden"
            draggable={false}
            style={{width:"30rem", height: "auto" , maxWidth:"40rem"}}
          />
        </div>
      </div>

      <div className="flex max-h-full min-h-full flex-1 flex-col items-center justify-between relative top-28 right-44 whitespace-nowrap">
        <button
          className="flex items-center justify-between rounded-xl bg-primary bg-opacity-20 p-3 px-[40%] text-2xl text-primary duration-300 hover:bg-opacity-70 hover:text-back bg-[#7afaa5] hover:bg-[#63ba82] relative top-16 "
          onClick={() => setShowModal1(true)}
        >
          <img
            src="/images/placeholder-land.png"
            alt="land"
            className="w-[55%] relative right-16"
          />
          <h3 className="font-raleway font-semibold tracking-tight relative left-[14%] text-[#249c4d]">
            Add Land
          </h3>
        </button>
        <button
          className="relative top-10 flex items-center justify-between rounded-xl bg-secondary bg-opacity-20 p-3 px-[40%] text-2xl text-secondary duration-300 hover:bg-opacity-70 hover:text-back bg-[#f3c259] hover:bg-[#ebab2d]"
          onClick={() => setShowModal(true)}
        >
          <img src="/images/ruined-land.png" alt="land" className="w-[58%] relative right-16" />
          <h3 className="font-raleway font-semibold tracking-tight relative left-[10%] text-[#ebab2d]">
            Add Crop
          </h3>
        </button>

        <button
          className="relative top-5 flex items-center justify-between rounded-xl bg-secondary bg-opacity-20 p-3 px-[40%] text-2xl text-secondary duration-300 hover:bg-opacity-70 hover:text-back  bg-[#7afaa5] hover:bg-[#63ba82]"
          onClick={() => setShowModal2(true)}
        >
          <img src="/images/sad-farmer.png" alt="land" className="w-[27%] relative right-12" />
          <h3 className="font-raleway font-semibold tracking-tight relative left-[39%] text-[#249c4d]">
            Add Item
          </h3>
        </button>
      </div>

      <div className="absolute left-[27%] right-0 top-[75%]">
        <h1 className="text-4xl font-sans font-semibold text-[#62bb82]">"To forget how to dig the earth and <br/> to tend the soil is to forget ourselves."</h1>
        <p className="absolute left-[45%] top-20 text-xl text-[#decb6c]"> ~ Mahatma Gandhi</p>
        </div>
      
      <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}
      >
        <div>{AddLand()}</div>
      </Modal>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>{AddCrop()}</div>
      </Modal>

      <Modal2 isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div>{Borrow()}</div>
      </Modal2>

      <Footer />
    </header>
  );
};

export default Header;
