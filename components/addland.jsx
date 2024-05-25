import React, { useState } from 'react';
import { addCrop, getAllCrop } from "../utils";
import AllCrop from "./allcrop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLand = () => {
  const [details, setDetails] = useState({
    area: "",
    price: "",
    days: "",
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
  //   try {
  //     const price = BigInt(details.price);
  //     const days = BigInt(details.days);
  //     setLoading(true);
  //     await addCrop(details.area, price, days);
  //     toast.success("Crop Added Successfully");
  //     console.log("Crop Added Successfully");
  //     const crops = await getAllCrop();
  //     console.log("All Crops:", crops);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error adding crop:", error);
  //     toast.error("Error adding crop: " + error.message);
  //     setLoading(false);
  //   }
    console.log(details);
   }

  return (
    <div className="flex justify-center relative ">
      <ToastContainer />
      <form className='p-12 bg-white rounded-lg shadow-black shadow-2xl' 
      onSubmit={handleSubmit}
      >
        <h1 className="text-5xl mb-6 text-black">Add Land</h1>
        <label htmlFor="area" className='text-black'>Area:</label><br />
        <input
          type="text"
          id="area"
          name="area"
          value={details.area}
          onChange={handleChange}
          placeholder="Enter the area"
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="price" className='text-black'>Price:</label><br />
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Enter the price"
          value={details.price}
          onChange={handleChange}
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="days" className='text-black'>Number Of Days:</label><br />
        <input
          type="text"
          id="days"
          name="days"
          placeholder="Enter the days"
          value={details.days}
          onChange={handleChange}
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        {isLoading ? (
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#b0d541] hover:bg-[#a6ca3b] transition duration-150 ease-out hover:ease-in rounded-md"
          >
            ...
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#b0d541] hover:bg-[#a6ca3b] transition duration-150 ease-out hover:ease-in rounded-md"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddLand;
