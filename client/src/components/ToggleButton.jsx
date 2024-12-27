import React, { useState } from "react";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled(!isToggled);

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className={`w-8 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
          isToggled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-3 aspect-square rounded-full shadow-md transform transition-transform ${
            isToggled ? "translate-x-4" : ""
          }`}
        ></div>
      </button>
      <span className="ml-3 text-sm font-medium text-gray-700">
        {isToggled ? "On" : "Off"}
      </span>
    </div>
  );
};

export default ToggleButton;
