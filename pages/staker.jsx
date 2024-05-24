import React from 'react'
import {useState} from 'react';
import Footer from "../components/footer";
 import AllCrop from "../components/allcrop";
import { getUserAddress,
  buyerStake,
  withdrawStake
} from "../utils";

const Stake = () => {

  const [amount, setAmount] = useState(0); 
  const handleStakeChange = (e) => {
    setAmount(e.target.value);
    console.log(setAmount);
  };

  return (
    <div>
      <section className="">
        <div className=" h-20">Heading</div>
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-0">
          Staking Dashboard
        </h1>
        <div className="my-6 flex justify-between relative  right-72">
          <div className="flex items-center gap-x-6  absolute  left-[75rem]">
            <button className="flex items-center gap-x-1 rounded-lg  px-12 py-1  tracking-tight text-secondary text-2xl  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 " 
             onClick={() => buyerStake(amount)}
           > Add Stake
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg  px-4 py-1  tracking-tight text-primary text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap" 
              onClick={() =>withdrawStake() }
              >Widthdraw Stake
            </button>
          </div>
        </div>
        <div className="h-96 relative top-24 left-72">
        <input
            type="number"
            value={amount}
            onChange={handleStakeChange}
            className="mb-4 px-2 py-2 rounded-md text-2xl relative left-80 border-2 border-[#219d4d] text-[#219d4d]"
            placeholder="Enter amount to stake"
          />
         <div className="relative -top-20">{AllCrop()}</div> 
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Stake;