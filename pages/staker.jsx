'use client'
import React, { useState } from "react";
import Footer from "../components/footer";
import AllCrop from "../components/allcrop";
import { buyerStake, withdrawStake , getStakeAmount} from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Stake = () => {
  const [amount, setAmount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [stakeAmount , setStakeAmount] = useState(0);
  const [withdrawStakeAmount , setWithdrawStakeAmount] = useState(null);

  const handleStakeChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddStake = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to stake");
      return;
    }
    try {
      setLoading(true);
      await buyerStake(amount);
      setIsButtonClicked(false);
      const stakedAmount = await getStakeAmount();
      setStakeAmount(stakedAmount);
      setLoading(false);
      const notify = () => toast("Amount Staked!");
      notify();
    } catch (error) {
      console.error("Failed to add stake:", error);
    }
  };
  console.log(stakeAmount);

  const handleWithdrawStake = async () => {
    try {
      setLoading1(true);
      const withdraw = await withdrawStake();
      setWithdrawStakeAmount(withdraw);
      setLoading1(false);
      const notify = () => toast("Stake withdrawn!");
      notify();
    }
    catch(error){
      console.error("Error withdrawing stake" , error);
    }
  }

  const displayedAmount = withdrawStakeAmount !== null  ? withdrawStakeAmount : stakeAmount[0];
  const displayedAmount1 = withdrawStakeAmount !==  null ? withdrawStakeAmount : stakeAmount[1];
  return (
    <div>
<div className="absolute  top-16 -left-14 ">
  <video className="w-[50rem]" autoPlay loop muted playsInline>
    <source src="/videos/happy-farmer1.mp4" type="video/mp4" />
  </video>
</div>

      <section className="absolute top-28 left-0 right-0">
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-14 ml-10">
          <span className="text-[#ebab2d]">Staking</span> 
  <span className="text-[#219d4d]">Dashboard</span>
        </h1>
        <div className="my-6 flex justify-between relative right-72 ">
          <div className="flex items-center gap-x-4 absolute left-[90%] ">
            <button
              className="flex items-center gap-x-1 rounded-lg px-6 py-1 tracking-tight text-secondary text-xl bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 "
              onClick={() => setIsButtonClicked(true)}
            >
              Add Stake
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg px-2 py-1 tracking-tight text-primary text-xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap"
              disabled={isLoading}
              onClick={handleWithdrawStake}
            >
              {isLoading1 ? "..." : "Withdraw Stake"}
            </button>
          </div>
        </div>
        {isButtonClicked && (
          <div className=" relative top-6 left-[53%]  w-0 h-0">
            <div className="flex -space-x-6 border w-0">
              <input
                type="number"
                value={amount}
                onChange={handleStakeChange}
                className="mb-2 w-16 h-8 rounded-md text-lg relative left-80 border-2 border-[#219d4d] text-[#219d4d]"
                placeholder="Enter amount to stake"
              />
              <button
                className="flex items-center gap-x-1 w-40 h-8 rounded-lg px-1 relative left-[22rem]  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500"
                disabled={isLoading}
                onClick={handleAddStake}
              >
               {isLoading ? '...' : 'Confirm Stake'}
              </button>
            </div>
          </div>
        )}
      
      <div className="-mt-8">
      <h1 className="text-3xl flex justify-center text-center text-[#7dcca1] ">{`Staked amount :  ${displayedAmount}`}</h1>
      <h1 className="text-3xl flex justify-center text-center text-[#7dcca1] ">{`Usable Stake :  ${displayedAmount1}`}</h1>
      </div>
        
        
        <div className="relative top-0 left-0 ml-48 ">{AllCrop()}</div>
      </section>

      <Footer />
    </div>
  );
};

export default Stake;
