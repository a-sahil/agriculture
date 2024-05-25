import React, { useState, useEffect } from "react";
import { getUserAddress, setPrice, getAllRequest } from "../utils";
import Toggle from "../components/toggle";
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
      setLoading(false);
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
    <div>
    <div className="flex justify-center items-center  bg-gray-100 absolute left-0 right-0 max-h-full">
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] max-w-5xl relative top-48 ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Set Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowData.length > 0 ? (
              borrowData.map((borrow) => (
                <tr key={borrow.requestId}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow._itemName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow._timePeriod}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="text"
                      placeholder="Set price"
                      value={priceMap[borrow.requestId] || ""}
                      onChange={(e) =>
                        handlePriceChange(borrow.requestId, e.target.value)
                      }
                      className="border border-gray-300 rounded py-1 px-2 w-24"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      className={`px-4 py-2 rounded-md text-white ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                      onClick={() => handleSetPrice(borrow.requestId)}
                      disabled={isLoading}
              
                    >
                      Set Price
                      {/* {isLoading ? 'Loading...' : 'Set Price'} */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No borrow requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div>{Toggle()}</div>
    </div>

  );
};

export default AllBorrowReq;
