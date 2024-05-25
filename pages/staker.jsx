import React, { useState } from "react";
import Footer from "../components/footer";
import AllCrop from "../components/allcrop";
import { buyerStake, withdrawStake , getStakeAmount ,getArea} from "../utils";


const Stake = () => {
  const [amount, setAmount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleStakeChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddStake = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to stake");
      return;
    }
    try {
      await buyerStake(amount);
      setIsButtonClicked(false);
    } catch (error) {
      console.error("Failed to add stake:", error);
    }
  };

  getStakeAmount();
  getArea();
  

  return (
    <div>
<div className="absolute  top-20">
  <video className="" autoPlay loop muted playsInline>
    <source src="/videos/happy-farmer1.mp4" type="video/mp4" />
    {/* Add additional source elements for different video formats if needed */}
    Your browser does not support the video tag.
  </video>
</div>

      <section className="absolute top-28 left-0 right-0">
        <h1 className="flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-14 ml-5">
          <span className="text-[#ebab2d]">Staking</span> 
  <span className="text-[#219d4d]">Dashboard</span>
        </h1>
        <div className="my-6 flex justify-between relative right-72 ">
          <div className="flex items-center gap-x-6 absolute left-[79rem] ">
            <button
              className="flex items-center gap-x-1 rounded-lg px-12 py-1 tracking-tight text-secondary text-2xl bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500 "
              onClick={() => setIsButtonClicked(true)}
            >
              Add Stake
            </button>
            <button
              className="flex items-center gap-x-1 rounded-lg px-4 py-1 tracking-tight text-primary text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap"
              onClick={() => withdrawStake()}
            >
              Withdraw Stake
            </button>
          </div>
        </div>
        {isButtonClicked && (
          <div className=" relative top-6 left-[45rem]  w-0 h-0">
            <div className="flex -space-x-6 border w-0">
              <input
                type="number"
                value={amount}
                onChange={handleStakeChange}
                className="mb-2 w-40 h-8 rounded-md text-lg relative left-80 border-2 border-[#219d4d] text-[#219d4d]"
                placeholder="Enter amount to stake"
              />
              <button
                className="flex items-center gap-x-1 w-40 h-8 rounded-lg px-5 relative left-[22rem]  bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500"
                onClick={handleAddStake}
              >
                Confirm Stake
              </button>
            </div>
          </div>
        )}

        <div className="relative top-0 left-0 ml-40 ">{AllCrop()}</div>
      </section>

      <Footer />
    </div>
  );
};

export default Stake;
