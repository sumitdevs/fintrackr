import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../utils/dateFormater";

function CreditProgress({data, onEdit, onDel}) {
  const totalBudget = data.limit;
  const spentAmount = 100;
  const percentage = Math.min((spentAmount / totalBudget) * 100, 100); // Ensure max is 100%

  return (
    <div>
      <div className="max-w-6xl flex flex-col gap-y-2 mx-auto border border-transparent shadow-md hover:border hover:border-gray-300 bg-white p-2 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium text-gray-700">{data.name}</p>
          <p>Limit: ₹{totalBudget}</p>
          <p>{formatDate(data.billingCycleEnd)}</p>
        </div>

        <div className="w-full   bg-gray-800 rounded-full h-4">
          <div
            className="h-4  rounded-full relative"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? "red" : "green",
              transition: "width 0.3s ease-in-out",
            }}
          >
            {/* <p className="absolute text-sm -right-10 ">{`${percentage}%`}</p> */}
          </div>
        </div>
        <div className="flex justify-between">
          <p
            className={`mt-2 text-sm ${
              percentage === 100 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {percentage === 100
              ? "Budget reached!"
              : `You have ₹${totalBudget - spentAmount} remaining.`}
          </p>
          <span className="flex  gap-x-2">
            <button onClick={onDel} className="w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm">
              <MdDelete />
            </button>
            <button onClick={onEdit} className="w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm">
              <MdEdit />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreditProgress;
