import React from 'react'
import {useState} from 'react';
import Footer from "../components/footer";
 import Page from "./verify";
import { getUserAddress,
  register,
  verifyFarmer,
  callRequestClaim,
  callClaim,
  getAllFarmers
} from "../utils";

const claim = () => {

  const handleError = async () => {
    try {
      await callClaim();
      console.log("Farm claimed successfully.");
    } catch (error) {
      console.error("Fake claim detected. Please try again." , error);
    }
    console.log("Fake claim")
  };


  return (
    <div>
      <section className="">
        <div className=" h-20">Heading</div>
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-0">
          <span className="material-icons text-5xl">&#xe871;</span> Claim
          Dashboard
        </h1>
        <div className="my-6 flex justify-between relative  right-32">
          <div className="flex items-center gap-x-6  absolute  left-[75rem]">
            <button className="flex items-center gap-x-1 rounded-lg  px-10 py-1 font-medium tracking-tight text-secondary text-2xl  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 " 
             onClick={() => callRequestClaim()}
            > Request claim
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg  px-12 py-1 font-medium tracking-tight text-primary text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500" 
              onClick={handleError}
              >claim
            </button>
          </div>
        </div>
      </section>
      <section className="p-page my-14 flex justify-between ">
        <div className="mx-auto flex w-[40%] h-[26rem] flex-col  items-center rounded-[3rem] bg-foreground  p-4 relative top-5 right-10 bg-[#e8e9e9]">
        <div className="border-8 border-[#219d4d] w-[23rem] h-96 rounded-full flex items-center justify-center">
          <div className="bg-[#565657] w-[21rem] h-[22rem] rounded-full flex items-center justify-center">
          <p className="text-xl text-white">{farmersData.area * 10000}</p>
          </div>
        
    </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default claim