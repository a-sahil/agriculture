import React, { useState, useEffect } from 'react';
import { getUserAddress,
  verifyFarmer,
  getAllFarmers
} from "../utils";
 import SignIn from "./SignIn";

const Page = () => {
  const [farmerAddress, setFarmerAddress] = useState(null);
  const [area , setArea] = useState(null);
  const [state , setState] = useState(null);
  const [farmersData , setFarmersData] = useState([]);
  const [isUserSignIn, setIsUserSignIn] = useState(false);

  useEffect(() => {
    setIsUserSignIn(true);
  }, []);
 

  useEffect(() => {
    const fetchData = async () => {
      if (isUserSignIn) {
          const farmersData = await getAllFarmers();
          console.log(farmersData);
          if (farmersData.length > 0) {
            const {farmerAddress, area, state } = farmersData[0]; 
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
      await verifyFarmer(farmerId);
      setFarmersData(prevFarmersData =>
        prevFarmersData.map(farmersData =>
          farmersData.farmerId === farmerId ? { ...farmersData, verified: true } : farmersData
        )
      );
      console.log("farmer verified");
    } catch (error) {
      setError("You do not have the necessary permissions to verify this farmer.");
      console.error('Verification error:', error);
    }
  };

 return (
  
  <div>
    <div>
      <img 
      src="/images/illustrations/farmland.png"
      alt=""
      className="w-screen "
      />
    </div>
<div className="absolute top-24 left-10">
      <div className="space-y-4">
        {farmersData.length > 0 ? (
          farmersData.map(farmersData => (
            <div key={farmersData.farmerId} className="flex space-x-12  text-white py-4 m-2 text-lg ">
              {farmersData.farmerAddress && <div className="ml-6">User Address: {farmersData.farmerAddress}</div>}
              {farmersData.area && <div>Area: {farmersData.area}</div>}
              {farmersData.state && <div>State: {farmersData.state}</div>}
              <button
                className={`relative left-80 px-16 py-4 rounded-md  ease-in-out duration-500 text-white opacity-80 ${farmersData.verified ? 'bg-blue-800 cursor-not-allowed' : 'bg-indigo-600'}`}
                onClick={() => handleVerify(farmersData.farmerId)}
                disabled={farmersData.verified}
              >
                {farmersData.verified ? 'Verified' : 'Verify'}
              </button>
            </div>
            
          ))
        ) : (
          <div>No farmers data available</div>
        )}

      </div>
    </div>
  </div>


  );
}

export default Page;
