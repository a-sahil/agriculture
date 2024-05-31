'use client'
import React, { useState } from 'react';
import { borrowRequest } from '../utils';
import AllBorrowReq from "./allborrowreq";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Borrow = () => {
  const [details, setDetails] = useState({
    _itemName: "",
    _timePeriod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _itemName, _timePeriod } = details;
    let timePeriod;
    try {
      timePeriod = BigInt(_timePeriod);
    } catch (error) {
      console.error("Invalid _timePeriod value:", _timePeriod);
      return; 
    }

    try {
      setLoading(true);
      await borrowRequest(_itemName, timePeriod);
      console.log("Borrow request sent successfully");
      setLoading(false);
      const notify = () => toast("Borrow request sent successfully");
      notify();
    } catch (error) {
      console.error("Error sending request:", error);
    }
    console.log(details);
  };

  return (
    <div className="flex justify-center relative ">
      <ToastContainer />
      <form className="p-12 bg-white rounded-lg shadow-black shadow-2xl " onSubmit={handleSubmit}>
        <h1 className="text-5xl mb-6 text-[#219d4d]">Borrow items</h1>
        <label htmlFor="_itemName" className="text-[#219d4d]">Item Name:</label><br />
        <input
          type="text"
          id="_itemName"
          name="_itemName"
          value={details._itemName}
          onChange={handleChange}
          placeholder="Enter the item name"
          className="px-5 py-2 w-72 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="days" className="text-[#219d4d]">Number of days:</label><br />
        <input
          type="text"
          id="_timePeriod"
          name="_timePeriod"
          placeholder="Enter the Number of days"
          value={details._timePeriod}
          onChange={handleChange}
          className="px-5 py-2 w-72 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

{isLoading ? (
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 w-72 mt-4 text-lg font-medium text-centerbg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap rounded-md"
            >
              ...
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-2 mt-4 text-lg font-medium text-center bg-[#e8f4ec] text-[#219d4d] border-2 border-[#219d4d] hover:bg-[#219d4d] hover:text-white transition ease-in-out duration-500 whitespace-nowrap rounded-md"
            >
              Submit
            </button>
          )}
        {/* <div className="absolute top-0 left-0 right-0">{AllBorrowReq()}</div> */}
      </form>
    </div>
  );
}

export default Borrow;
