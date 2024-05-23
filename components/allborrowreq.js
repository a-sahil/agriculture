import React, { useState, useEffect } from 'react';
import { getUserAddress, setPrice, getAllRequest} from "../utils";

const AllBorrowReq = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [borrowData, setBorrowData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [priceMap, setPriceMap] = useState({});

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
        const borrowRequests = await getAllRequest();
        console.log(borrowRequests);
        setBorrowData(borrowRequests);
      }
    };
    fetchData();
  }, [isUserSignIn]);

  const handleSetPrice = async (requestId) => {
    const price = priceMap[requestId];
    if (!price) {
      console.error("Price is not defined");
      return;
    }

    let priceBigInt;
    try {
      priceBigInt = BigInt(price);
    } catch (error) {
      console.error("Invalid price value:", error);
      return;
    }

    try {
      await setPrice(requestId, priceBigInt);
      console.log("Price set successfully");
    } catch (error) {
      console.error("Failed to set price:", error);
    }
  };

  const handlePriceChange = (requestId, value) => {
    setPriceMap((prev) => ({
      ...prev,
      [requestId]: value,
    }));
  };

  return (
    <div className="absolute top-24 left-10">
      <div className="space-y-4">
        {borrowData.length > 0 ? (
          borrowData.map(borrow => (
            <div key={borrow.requestId} className="flex space-x-6 w-[65rem] text-black py-4 m-2 text-lg">
              <div className="flex space-x-2">
              {borrow.requestId && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center">Id: {borrow.requestId}</div>}
              {borrow._itemName && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center">Item: {borrow._itemName}</div>}
              {borrow._timePeriod && <div className="bg-[#fcf7ea] text-[#ebab2d] w-40 h-12 rounded-md shadow-md text-center ">Days: {borrow._timePeriod}</div>}
              </div>
             
              <div>
              <input
                type="text"
                placeholder="Set price"
                value={priceMap[borrow.requestId] || ""}
                onChange={(e) => handlePriceChange(borrow.requestId, e.target.value)}
                className=" border border-gray-300 rounded"
              />
              <button
                className="px-1 rounded-md bg-[#7efeab] hover:bg-[#219d4d] text-gray ease-in-out duration-500 text-white opacity-80 shadow-lg"
                onClick={() => handleSetPrice(borrow.requestId)}
              >
                Set Price
              </button>
              </div>
             
              {/* <button
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() => handlePurchase(borrow.borrowId)}
              >
                Purchase
              </button> */}
            </div>
          ))
        ) : (
          <div>No borrow requests available</div>
        )}
      </div>
    </div>
  );
};

export default AllBorrowReq;
