'use client'
import React, { useState, useEffect } from 'react';
import Footer from "../components/footer";
import { getUserAddress, callRequestClaim, callFakeClaim, getArea ,getAllFarmers , farmerDetails} from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Claim = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [area, setArea] = useState(null);
  // const [area1, setArea1] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [farmersData, setFarmersData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  useEffect(() => {
    setIsUserSignIn(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isUserSignIn) {
        setLoading2(true);
        const data = await getAllFarmers();
        console.log(data);
        setLoading2(false);
        setFarmersData(data);
        if (data.length > 0) {
          const { farmerAddress, area, state, country } = data[0]; 
          setFarmerAddress(farmerAddress);
          setArea(area);
          setState(state);
          setCountry(country);
        }
      }
    };

    fetchData();
  }, [isUserSignIn]);


  const handleRequest = async () => {
   
      setLoading1(true);
      await callRequestClaim();
      // const calculatedArea = getArea();
      // setArea(calculatedArea);
      setLoading1(false);
      toast("Farmer Request for Claim!");

    }
  

  const handleError = async () => {
    try {
      setLoading(true);
      await callFakeClaim(true);
      toast("Farmer claimed successfully!");
    } catch (error) {
      console.error("Fake claim detected. Please try again.", error);
      toast.error("Fake claim detected. Please try again.");
    } finally {
      setLoading(false);
    }
  };



 const claimValue = area * 10000;
  
  return (
    <div>
      <ToastContainer />
      <section className="w-full">
        <div className="h-32 flex justify-center items-center text-5xl w-full ">
          {/* <span className="text-gray-500">H</span>
          <span className="text-[#219d4d]">ead</span>
          <span className="text-[#ebab2d]">ing</span> */}
        </div>
        <h1 className="hover-effect flex items-center gap-x-3 font-raleway text-4xl font-semibold tracking-tight relative top-0 ml-10">
  <span className="text-[#ebab2d]">Claim</span> 
  <span className="text-[#219d4d]">Dashboard</span>
</h1>

        <div className="my-6 flex justify-between relative -top-14 right-5">
          <div className="flex items-center gap-x-6 absolute left-[75%]">
            <button
              className="flex items-center gap-x-1 rounded-lg px-2 py-1 font-medium tracking-tight text-secondary text-2xl bg-[#fcf7ea] text-[#ebab2d] border-2 border-[#ebab2d] hover:bg-[#ebab2d] hover:text-white whitespace-nowrap transition ease-in-out duration-500"
              onClick={handleRequest}
              disabled={isLoading1}
            >
             {isLoading1 ? "..." : "Request Claim"}
            </button>

            <button
              className="flex items-center gap-x-1 rounded-lg px-6 py-1 font-medium tracking-tight text-2xl bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500"
              onClick={handleError}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Claim"}
            </button>
          </div>
        </div>
      </section >
      <section className="p-page my-14 flex justify-between w-full">
        <div className="mx-auto flex w-[40%] h-[26rem] flex-col items-center rounded-[3rem] bg-foreground p-4 relative left-24 bg-[#e8e9e9]">
          <div className="border-8 border-[#219d4d] w-[23rem] h-96 rounded-full flex items-center justify-center">
            <div className="bg-[#565657] w-[21rem] h-[22rem] rounded-full flex items-center justify-center">
              <p className="text-xl text-white">{`Claim value is: ${claimValue}`}</p>
            </div>
          </div>
        </div>
        <div className="relative right-10 ">
          {farmersData.length > 0 ? (
            farmersData.map((farmer) => (
              <div key={farmer.farmerId} className="border-b bg-gray-100 hover:bg-gray-200 ease-in-out duration-500 rounded-lg ">
                <div className="p-4">{farmer.farmerId}</div>
                <div className="p-4">{farmer.farmerAddress}</div>
                <div className="p-4">{farmer.area}</div>
                <div className="p-4">{farmer.state}</div>
                <div className="p-4">{farmer.country}</div>
              </div>
            ))
          ) : (
            <p>No farmers found</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Claim;
