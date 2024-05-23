import React, { useState } from 'react';
import { borrowRequest } from '../utils';
import AllBorrowReq from "../components/allborrowreq";
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
      await borrowRequest(_itemName, timePeriod);
      console.log("Borrow request sent successfully");
    } catch (error) {
      console.error("Error sending request:", error);
    }

    console.log(details);
  };

  return (
    <div className="flex justify-center relative top-20">
      <form className="p-12 bg-white rounded-lg shadow-black shadow-2xl" onSubmit={handleSubmit}>
        <h1 className="text-5xl mb-6 text-black">Borrow items</h1>
        <label htmlFor="_itemName" className="text-black">Item Name:</label><br />
        <input
          type="text"
          id="_itemName"
          name="_itemName"
          value={details._itemName}
          onChange={handleChange}
          placeholder="Enter The _itemName"
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="days" className="text-black">Number of days:</label><br />
        <input
          type="text"
          id="_timePeriod"
          name="_timePeriod"
          placeholder="Enter the Number of days"
          value={details._timePeriod}
          onChange={handleChange}
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <button type="submit" className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#448aff] hover:bg-[#0d47a1] transition duration-150 ease-out hover:ease-in rounded-md shadow-lg">Submit</button>
      </form>

      <div className="absolute  top-[25rem] left-40">
        {AllBorrowReq()}
      </div>
    </div>
  );
}

export default Borrow;
