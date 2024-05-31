'use client'
import React, { useState, useEffect } from "react";
import { getUserAddress, getAllRentals, acceptRental } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllLand = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [landData, setLandData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [loadingLand, setLoadingLand] = useState({});

  useEffect(() => {
    const checkUserSignIn = async () => {
      try {
        const address = await getUserAddress();
        if (address) {
          setFarmerAddress(address);
          setIsUserSignIn(true);
        }
      } catch (error) {
        console.error("Failed to fetch user address:", error);
      }
    };
    checkUserSignIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isUserSignIn) {
          const landData = await getAllRentals();
          console.log("land data is: ",landData);
          setLandData(landData);
        }
      } catch (error) {
        console.error("Failed to fetch land data:", error);
      }
    };
    fetchData();
  }, [isUserSignIn]);

  const handleBuyLand = async (rentalId , rentAmount) => {
    try {
      setLoadingLand((prev) => ({ ...prev, [rentalId]: true }));
      await acceptRental(rentalId , rentAmount);
      const updatedLandsData = await getAllRentals();
      setLandData(updatedLandsData);
      setLoadingLand((prev) => ({ ...prev, [rentalId]: false }));
      toast("Land purchased successfully!");
    } catch (error) {
      console.error("Failed to buy land:", error);
      setLoadingLand((prev) => ({ ...prev, [rentalId]: false }));
    }
  };

  return (
    <div>
      <div className="mt-28 mx-3 absolute left-[28rem] top-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-[40rem]">
          <div className="bg-[#fcf7ea] border-b border-gray-200  text-xs font-semibold uppercase tracking-wider text-gray-500">
            <div className="flex p-4">
              <div className="w-1/4">Rental ID</div>
              <div className="w-1/4">Area</div>
              <div className="w-1/4">Amount</div>
              <div className="w-1/4">Days</div>
              <div className="w-1/4">Action</div>
            </div>
          </div>
          {landData.length > 0 ? (
            landData.map((land) => (
              <div
                key={land.rentalId}
                className="border-b border-gray-200 text-gray-700"
              >
                <div className="flex items-center p-[1.5%] hover:bg-gray-50">
                  <div className="w-1/4">{land.rentalId}</div>
                  <div className="w-1/4">{land.area}</div>
                  <div className="w-1/4">{land.rentAmount}</div>
                  <div className="w-1/4">{land.rentDuration}</div>
                  <div className="w-1/4 flex">
                    <button
                      className="px-2 py-[1%] rounded-md bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap"
                      onClick={() => handleBuyLand(land.rentalId, land.rentAmount)}
                      disabled={loadingLand[land.rentalId]}
                    >
                      {loadingLand[land.landId] ? "Loading..." : "Accept"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No land available for purchase
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllLand;
