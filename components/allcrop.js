import React, { useState, useEffect } from 'react';
import { getUserAddress, getAllCrop, buyCrop } from "../utils";

const AllCrop = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [cropData, setCropData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);

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

  const handleBuyCrop = async (cropId, quantity) => {
    try {
      await buyCrop(cropId, quantity);
      const updatedCropsData = await getAllCrop();
      setCropData(updatedCropsData);
    } catch (error) {
      console.error("Failed to buy crop:", error);
    }
  };

  return (
    <div>
      <div className="absolute top-24 left-10">
        <div className="space-y-4 ">
          {cropData.length > 0 ? (
            cropData.map(crop => (
              <div key={crop.cropId} className="flex space-x-12 w-[65rem] text-black py-4 m-2 text-lg ">
                {crop.cropId && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center ">cropId: {crop.cropId}</div>}
                {crop.cropName && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center ml-6">CropName: {crop.cropName}</div>}
                {crop.quantity && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center ">Quantity: {crop.quantity}</div>}
                <button
                  className="relative left-20 px-12 py-2 rounded-md bg-[#7efeab] hover:bg-[#219d4d] text-gray ease-in-out duration-500 text-white opacity-80 shadow-lg"
                  onClick={() => handleBuyCrop(crop.cropId, crop.quantity)}
                >
                  Buy Crop
                </button>
              </div>
            ))
          ) : (
            <div>Add crops to purchase</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCrop;
