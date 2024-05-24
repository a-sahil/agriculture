import React, { useState, useEffect } from 'react';
import { getUserAddress, setPrice, getAllRequest} from "../utils";

const AllBorrowReq = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [borrowData, setBorrowData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [priceMap, setPriceMap] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserSignIn = async () => {
      setLoading(true);
      const address = await getUserAddress();
      setLoading(false);
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
        setLoading(true);
        const borrowRequests = await getAllRequest();
        setLoading(false);
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
      setLoading(true);
      await setPrice(requestId, priceBigInt);
      console.log("Price set successfully");
      setLoading(true);
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
      <div className="space-y-4 w-[45rem] border-2 border-[#219d4d] mb-20 ml-44">
        {borrowData.length > 0 ? (
          borrowData.map(borrow => (
            <div key={borrow.requestId} className="flex space-x-6 w-[44rem] text-black py-4 m-2 text-lg hr">
              <div className="flex space-x-2 ">
              {borrow.requestId && <div className="bg-[#fcf7ea] text-[#ebab2d] w-28 h-10 rounded-md shadow-md text-center ">Id: {borrow.requestId}</div>}
              {borrow._itemName && <div className="bg-[#fcf7ea] text-[#ebab2d] w-28 h-10 rounded-md shadow-md text-center">Item: {borrow._itemName}</div>}
              {borrow._timePeriod && <div className="bg-[#fcf7ea] text-[#ebab2d] w-28 h-10 rounded-md shadow-md text-center ">Days: {borrow._timePeriod}</div>}
              </div>
             
              <div className="space-x-2 flex">
              <input
                type="text"
                placeholder="Set price"
                value={priceMap[borrow.requestId] || ""}
                onChange={(e) => handlePriceChange(borrow.requestId, e.target.value)}
                className="border border-gray-300 rounded py-1 px-2" 
              />

{isLoading ? (
               <button
               className="px-2 py-1 rounded-md bg-[#7efeab] hover:bg-[#219d4d] border-2 border-[#219d4d] text-gray ease-in-out duration-500 text-white opacity-80 shadow-lg whitespace-nowrap"
               onClick={() => handleSetPrice(borrow.requestId)}
             >
              ...
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#b0d541] hover:bg-[#a6ca3b] transition duration-150 ease-out hover:ease-in rounded-md"
            >
               Set Price
            </button>
          )}


            
              </div>
              <hr className="my-4 border-green-800 px-[22.5rem] relative top-8 right-[44.5rem]" />
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
