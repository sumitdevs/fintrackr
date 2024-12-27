import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const SavingCard = () => {
  // Determine the color dynamically based on the percentage value
  const percentage = 80
  const getColor = (value) => {
    if (value <= 30) return "#EF4444"; // Red for low savings
    if (value <= 70) return "#F59E0B"; // Yellow for medium savings
    return "#10B981"; // Green for high savings
  };

  return (
    <div className="col-span-2 flex bg-white items-center">
       <div className="mb-4 text-center flex-1">
        <p className="text-3xl font-semibold text-gray-700"> &#8377; 4000</p>
      </div>
      <div className="flex-1">
        <div className="p-4">
        <p className="text-center text-sm py-2">Savings</p>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: getColor(percentage),
            textColor: "#374151", // Text color (Gray)
            trailColor: "#E5E7EB", // Trail color (Light Gray)
            textSize: "16px",
          })}
        />
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
