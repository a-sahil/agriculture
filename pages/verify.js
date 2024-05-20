import React, { useState, useEffect } from 'react';
import { getUserAddress,
  register,
  verifyFarmer,
  requestClaim,
  claim,
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
          }
          console.log(area);
          console.log(state);
        
      }
    };
  
    fetchData();
  }, [isUserSignIn]);
  
 

  return (
<div className="absolute top-24 left-10">
      <div className="space-y-4">
        {farmersData.length > 0 ? (
          farmersData.map(farmersData => (
            <div key={farmersData.farmerId} className="flex space-x-12  border-2 border-blue-600 py-4 m-2 text-lg ">
              {farmersData.farmerAddress && <div className="ml-6">User Address: {farmersData.farmerAddress}</div>}
              {farmersData.area && <div>Area: {farmersData.area}</div>}
              {farmersData.state && <div>State: {farmersData.state}</div>}
              <button className='relative left-80 bg-indigo-600 px-16 py-4 rounded-md hover:bg-indigo-800 ease-in-out duration-500 text-white opacity-80' onClick={verifyFarmer()}>Verify</button>
            </div>
            
          ))
        ) : (
          <div>No farmers data available</div>
        )}

      </div>
    </div>
  );
}

export default Page;
