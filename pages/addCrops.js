import React, { useState } from 'react';
import countries from "./countries";
import {
 addCrop , getAllCrop
} from "../utils";
import Modal from "../components/Modal";
import Header from "./dashboard";
const AddCrop = () => {
  const [details, setDetails] = useState({
    cropName: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCrop(details.cropName, details.price, details.quantity);
      console.log("Crop Added Successfully");
      console.log(getAllCrop());

  } catch (error) {
      console.error("Error adding crop:", error);
  }
  console.log(details);
};

const[showModal , setShowModal] = useState('false');

  return (
    <div className="flex justify-center relative ">
      <form className='p-12 bg-white rounded-lg shadow-black shadow-2xl' onSubmit={handleSubmit}>
        <h1 className="text-5xl mb-6 text-black">Add crop</h1>
        <label htmlFor="cropName" className='text-black'>Crop Name:</label><br />
        <input
          type="text"
          id="cropName"
          name="cropName"
          value={details.cropName}
          onChange={handleChange}
          placeholder="hectares"
          className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="price" className='text-black'>Price:</label><br />
        <input
          type="text"
          id="price"
          name="price"
          placeholder=""
          value={details.price}
          onChange={handleChange}
          className="px-14 py-2 border border-gray-300  bg-white text-black rounded"
        /><br /><br />

        <label htmlFor="quantity" className='text-black'>Quantity (in Kg):</label><br />
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Enter the quantity"
          value={details.quantity}
          onChange={handleChange}
          className="px-14 py-2 border border-gray-300  bg-white text-black rounded"
        /><br /><br />

        <button type="submit" className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#448aff] hover:bg-[#0d47a1] transition duration-150 ease-out hover:ease-in rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default AddCrop;

