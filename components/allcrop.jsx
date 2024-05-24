import React, { useState, useEffect } from "react";
import { getUserAddress, getAllCrop, sell } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCrop = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [cropData, setCropData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);

  const [isLoading, setLoading] = useState(false);

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
      setLoading(true);
      await sell(cropId);
      // const updatedCropsData = await getAllCrop();
      // setCropData(updatedCropsData);
      setLoading(false);
      const notify = () => toast("Crops buy successfully!");
      notify();
    } catch (error) {
      console.error("Failed to buy crop:", error);
    }
  };

  return (
    <div>
      <div className="absolute top-24 left-10">
        <div className="space-y-4 ">
          {cropData.length > 0 ? (
            cropData.map((crop) => (
              <div
                key={crop.cropId}
                className="flex space-x-6 w-[65rem] text-black py-4 m-2 text-lg "
              >
                {crop.cropId && (
                  <div className="bg-[#fcf7ea] text-[#ebab2d] w-36 h-10 rounded-md shadow-md text-center ">
                    cropId: {crop.cropId}
                  </div>
                )}
                {crop.cropName && (
                  <div className="bg-[#fcf7ea] text-[#ebab2d] w-44 h-10 rounded-md shadow-md text-center ml-6 whitespace-nowrap">
                    CropName: {crop.cropName}
                  </div>
                )}
                {crop.quantity && (
                  <div className="bg-[#fcf7ea] text-[#ebab2d] w-36 h-10 rounded-md shadow-md text-center ">
                    Quantity: {crop.quantity}
                  </div>
                )}
                <button className="relative left-20 px-12 py-2 rounded-md bg-[#7efeab] hover:bg-[#219d4d] text-gray ease-in-out duration-500 text-white opacity-80 shadow-lg"
                  disabled={isLoading}
                  onClick={() => handleBuyCrop(crop.cropId)}
                  >
                     Buy crop
                  </button>
                
                {/* {isLoading ? (
                  <button
                    className="relative -top-4 px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#b0d541] hover:bg-[#a6ca3b] transition duration-150 ease-out hover:ease-in rounded-md"
                  >
                   ...
                  </button>
                ) : (
                  <button
                    disabled={isLoading}
                    className="relative -top-4 px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#b0d541] hover:bg-[#a6ca3b] transition duration-150 ease-out hover:ease-in rounded-md"
                    onClick={() => handleBuyCrop(crop.cropId)}
                  >
                    Buy crop
                  </button>
                )} */}
              </div>
            ))
          ) : (
            <div>Add crops to purchase</div>
          )}
          
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllCrop;
