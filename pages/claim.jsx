import React from 'react'
import {useState} from 'react';
import Footer from "../components/footer";
 import Area from "./verify";
import { getUserAddress,
  callRequestClaim,
  callClaim,
} from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const claim = () => {
  const [isLoading, setLoading] = useState(false);

  const handleError = async () => {
    try {
      setLoading(true);
      await callClaim();
      console.log("Farm claimed successfully.");
      setLoading(false);
      const notify = () => toast("Farmer claimed successfully!");
      notify();
    } catch (error) {
      console.error("Fake claim detected. Please try again." , error);

    }
    console.log("Fake claim")
  };


  return (
    <div>
       <ToastContainer />
      <section className="">
        <div className=" h-32 flex justify-center items-center text-5xl"><span className="text-gray-500">H</span><span className="text-[#219d4d]">ead</span><span className="text-[#ebab2d]">ing</span></div>
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-0">
         Claim Dashboard
        </h1>
        <div className="my-6 flex justify-between relative -top-14 right-32">
          <div className="flex items-center gap-x-6  absolute  left-[75rem]">
            <button className="flex items-center gap-x-1 rounded-lg  px-6 py-1 font-medium tracking-tight text-secondary text-2xl  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 " 
             onClick={() => callRequestClaim()}
            > Request claim
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg px-12 py-1 font-medium tracking-tight text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500" 
              onClick={handleError}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Claim"}
            </button>
          </div>
        </div>
      </section>
      <section className="p-page my-14 flex justify-between ">
        <div className="mx-auto flex w-[40%] h-[26rem] flex-col  items-center rounded-[3rem] bg-foreground  p-4 relative top-5 right-10 bg-[#e8e9e9]">
        <div className="border-8 border-[#219d4d] w-[23rem] h-96 rounded-full flex items-center justify-center">
          <div className="bg-[#565657] w-[21rem] h-[22rem] rounded-full flex items-center justify-center">
          <p className="text-xl text-white">{Area * 10000}</p>
          </div>
        
    </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default claim