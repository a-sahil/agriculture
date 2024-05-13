import React, { useState } from 'react';
import countries from "./countries";

const SignIn = () => {
    const [details, setDetails] = useState({
        area: "",
        state: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
    };

    return (
        <div className="flex justify-center relative top-20">
            <form className='p-12 bg-white rounded-lg ' onSubmit={handleSubmit}>
                <h1 className="text-5xl mb-6 text-black">Registration</h1>
                <label htmlFor="area" className='text-black'>Area:</label><br />
                <input
                    type="text"
                    id="area"
                    name="area"
                    value={details.area}
                    onChange={handleChange}
                    placeholder="hectares"
                    className="px-14 py-2 border border-gray-300 bg-white text-black rounded"
                /><br /><br />

                <label htmlFor="state" className='text-black'>State:</label><br />
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={details.state}
                    onChange={handleChange}
                    className="px-14 py-2 border border-gray-300  bg-white text-black rounded"
                /><br /><br />

                <label className='text-black'>
                    Country:
                    <select
                        name="country"
                        value={details.country}
                        onChange={handleChange}
                        className=" px-14 py-2 flex border border-gray-300 bg-white rounded"
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

export default SignIn;

