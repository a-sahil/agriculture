'use client'
import React, { useState, useEffect } from "react";
import { getUserAddress, getAllCrop, sell } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCrop = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [cropData, setCropData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState({});


  useEffect(() => {
    const checkUserSignIn = async () => {
      const address = await getUserAddress();
      if (address) {
        setFarmerAddress(address);
        setIsUserSignIn(true);
      }
    };
    checkUserSignIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isUserSignIn) {
        const cropsData = await getAllCrop();
        setCropData(cropsData);
      }
    };
    fetchData();
  }, [isUserSignIn]);

  const handleBuyCrop = async (cropId) => {
    try {
      setLoadingCrops((prev) => ({ ...prev, [cropId]: true }));
      await sell(cropId);
      const updatedCropsData = await getAllCrop();
      setCropData(updatedCropsData);
      setLoadingCrops((prev) => ({ ...prev, [cropId]: false }));
      const notify = () => toast("Crops buy successfully!");
      notify();
    } catch (error) {
      console.error("Failed to buy crop:", error);
      setLoadingCrops((prev) => ({ ...prev, [cropId]: false }));
    }
  };

  return (
    <div>
      <div className="mt-28 mx-4 absolute left-[44rem]">
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-[160%]">
          <div className="bg-[#fcf7ea] border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            <div className="flex p-4">
              <div className="w-1/4">CropId</div>
              <div className="w-1/4">CropName</div>
              <div className="w-1/4">Quantity</div>
              <div className="w-1/4">Action</div>
            </div>
          </div>
          {cropData.length > 0 ? (
            cropData.map((crop) => (
              <div
                key={crop.cropId}
                className="border-b border-gray-200 text-gray-700"
              >
                <div className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-1/4 ">{crop.cropId}</div>
                  <div className="w-1/4 ">{crop.cropName}</div>
                  <div className="w-1/4 ">{crop.quantity}</div>
                  <div className="w-1/4 flex ">
                  <button
                      className="px-4 py-2 rounded-md bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap"
                      onClick={() => handleBuyCrop(crop.cropId)}
                      disabled={loadingCrops[crop.cropId]}
                    >
                      {loadingCrops[crop.cropId] ? "..." : "Buy"}
                    </button>
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Add crops to purchase
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllCrop;
