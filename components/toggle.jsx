import React, { useState } from 'react';

const ToggleButton = () => {
  const [isLand, setIsLand] = useState(true);

  return (
    <div className=" flex items-center justify-center min-h-screen ">
      <div className="absolute  top-20  flex items-center rounded-full shadow-lg p-2">
        <button
          onClick={() => setIsLand(true)}
          className={`px-4 py-2 rounded-full focus:outline-none transition-colors ${
            isLand ? 'bg-[#219d4d] text-white' : ' text-gray-700'
          }`}
        >
          Land
        </button>
        <button
          onClick={() => setIsLand(false)}
          className={`px-4 py-2 rounded-full focus:outline-none transition-colors ${
            !isLand ? 'bg-[#219d4d] text-white' : ' text-gray-700'
          }`}
        >
          Commodities
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;