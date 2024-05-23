import React from 'react'
import {useState} from 'react';
import Footer from "../components/footer";
 import AllCrop from "../components/allcrop";
import { getUserAddress,
  register,
  verifyFarmer,
  callRequestClaim,
  callClaim,
  getAllFarmers,
  buyerStake,
  withdrawStake
} from "../utils";

const Stake = () => {

  const [amount, setAmount] = useState(0); 


  return (
    <div>
      <section className="">
        <div className=" h-20">Heading</div>
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-0">
          <span className="material-icons text-5xl">&#xe871;</span>
          Staking Dashboard
        </h1>
        <div className="my-6 flex justify-between relative  right-72">
          <div className="flex items-center gap-x-6  absolute  left-[75rem]">
            <button className="flex items-center gap-x-1 rounded-lg  px-10 py-1 font-medium tracking-tight text-secondary text-2xl  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 " 
             onClick={() => withdrawStake()}
           > Widthdraw Stake
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg  px-12 py-1 font-medium tracking-tight text-primary text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500" 
              onClick={() => buyerStake(amount)}
              >Stake
            </button>
          </div>
        </div>
        <div className="h-96 relative top-24 left-56">
         <div className="relative -top-20">{AllCrop()}</div> 
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Stake;