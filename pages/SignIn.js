import React, { useState } from 'react';
import countries from "./countries";
import { getUserAddress,
    register,
    verifyFarmer,
    callRequestClaim,
    callClaim,
    getAllFarmers
  } from "../utils";

const  SignIn = () => {
    const [details, setDetails] = useState({
        _area: "",
        _state: "",
        _country: "",
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
            await register(details._area, details._state, details._country);
            console.log("Farmer is registered");
             //getUserAddress();
             getAllFarmers()

        } catch (error) {
            console.error("Error registering farmer:", error);
        }
        console.log(details);
    };

    return (
        
        <div className="flex justify-center relative top-20">
            <form className='p-12 bg-white rounded-lg shadow-black shadow-2xl' onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-6 text-black">Registration</h1>
                <label htmlFor="area" className='text-black'>Area:</label><br />
                <input
                    type="text"
                    id="_area"
                    name="_area"
                    value={details._area}
                     onChange={handleChange}
                    placeholder="hectares"
                    className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
                /><br /><br />

                <label htmlFor="state" className='text-black'>State:</label><br />
                <input
                    type="text"
                    id="_state"
                    name="_state"
                    placeholder="Enter your State"
                    value={details._state}
                     onChange={handleChange}
                    className="px-14 py-2 border border-gray-300  bg-white text-black rounded"
                /><br /><br />

                <label className='text-black'>
                    Country:
                    <select
                        name="_country"
                        value={details._country}
                         onChange={handleChange}
                        className=" px-14 py-2 flex border border-gray-300 bg-white rounded"
                        placeholder="Select Your Country"
                        required
                    >
                        <option key="" value=""></option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </label><br />

                <button type="submit" className="px-10 py-2 mt-4 text-lg font-medium text-center text-white bg-[#448aff] hover:bg-[#0d47a1] transition duration-150 ease-out hover:ease-in rounded-md">Submit</button>
            </form>
        </div>
    );
};

export default  SignIn;

