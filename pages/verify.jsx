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
  const [loadingStatus, setLoadingStatus] = useState({});
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
      setLoadingStatus((prev) => ({ ...prev, [farmerId]: true }));
      await verifyFarmer(farmerId);
      setFarmersData(prevFarmersData =>
        prevFarmersData.map(farmersData =>
          farmersData.farmerId === farmerId ? { ...farmersData, verified: true } : farmersData
        )
      );
      console.log("farmer verified");
      setLoadingStatus((prev) => ({ ...prev, [farmerId]: false }));
      toast("Farmer is verified");
    } catch (error) {
      console.error('Verification error:', error);
      setLoadingStatus((prev) => ({ ...prev, [farmerId]: false }));
    }
  };

  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <div className="absolute top-24  bg-white bg-opacity-70 p-8 rounded-xl shadow-2xl w-screen">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">User Address</th>
                <th className="text-left p-4">Area</th>
                <th className="text-left p-4">State</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {farmersData.length > 0 ? (
                farmersData.map((farmersData) => (
                  <tr key={farmersData.farmerId} className="border-b hover:bg-gray-50">
                    <td className="p-4">{farmersData.farmerId}</td>
                    <td className="p-4">{farmersData.farmerAddress}</td>
                    <td className="p-4">{farmersData.area}</td>
                    <td className="p-4">{farmersData.state}</td>
                    <td className="p-4">
                    <button
                        className={`px-4 py-2 rounded-md text-white ${
                          farmersData.verified ? 'bg-red-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800'
                        }`}
                        onClick={() => handleVerify(farmersData.farmerId)}
                        disabled={farmersData.verified || loadingStatus[farmersData.farmerId]}
                      >
                        {loadingStatus[farmersData.farmerId] ? 'Verifying...' : (farmersData.verified ? 'Verified' : 'Verify')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No farmers data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Verify;
