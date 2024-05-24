import React, { useState, useEffect } from 'react';
import { getUserAddress, verifyFarmer, getAllFarmers } from "../utils";
import SignIn from "./SignIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [area, setArea] = useState(null);
  const [state, setState] = useState(null);
  const [farmersData, setFarmersData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setIsUserSignIn(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isUserSignIn) {
        setLoading(true);
        const farmersData = await getAllFarmers();
        console.log(farmersData);
        setLoading(false);
        if (farmersData.length > 0) {
          const { farmerAddress, area, state } = farmersData[0];
          setFarmerAddress(farmerAddress);
          setArea(area);
          setState(state);
          setFarmersData(farmersData);
          const farmersWithVerificationStatus = farmersData.map(farmersData => ({
            ...farmersData,
            verified: farmersData.isVerified,
          }));
          setFarmersData(farmersWithVerificationStatus);
        }
      }
    };

    fetchData();
  }, [isUserSignIn]);

  const handleVerify = async (farmerId) => {
    try {
      setLoading(true);
      await verifyFarmer(farmerId);
      setFarmersData(prevFarmersData =>
        prevFarmersData.map(farmersData =>
          farmersData.farmerId === farmerId ? { ...farmersData, verified: true } : farmersData
        )
      );
      console.log("farmer verified");
      setLoading(false);
      toast("Farmer is verified");
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex justify-center items-center">
      <ToastContainer />
      <div className="absolute top-24 left-10 bg-white bg-opacity-70 p-10 rounded-xl shadow-xl">
        <div className="space-y-6">
          {farmersData.length > 0 ? (
            farmersData.map(farmersData => (
              <div key={farmersData.farmerId} className="flex flex-col md:flex-row md:items-center md:space-x-12 py-4 m-2 text-lg bg-gradient-to-r from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-lg transition-transform transform  border border-gray-300">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-12 py-4 m-2 hover:scale-105">
                  {farmersData.farmerAddress && <div className="ml-6 text-gray-800 font-medium">User Address: <span className="font-semibold">{farmersData.farmerAddress}</span></div>}
                  {farmersData.area && <div className="text-gray-800 font-medium">Area: <span className="font-semibold">{farmersData.area}</span></div>}
                  {farmersData.state && <div className="text-gray-800 font-medium">State: <span className="font-semibold">{farmersData.state}</span></div>}
                </div>
                <button
                  className={`relative md:left-80 px-8 py-3 mt-4 md:mt-0 hover:scale-105 rounded-md text-white transition-all ease-in-out duration-500 ${
                    farmersData.verified ? 'bg-red-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800'
                  }`}
                  onClick={() => handleVerify(farmersData.farmerId)}
                  disabled={farmersData.verified}
                >
                  {farmersData.verified ? 'Verified' : 'Verify'}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-white">No farmers data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
