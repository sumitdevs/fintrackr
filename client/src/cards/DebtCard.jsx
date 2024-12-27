import React from 'react';
import { IoFastFood } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";



function DebtCard({data, onDel, onEdit}) {
    const  totalBudget = data.value;
    const spentAmount  = 100;
  // Calculate percentage
  const percentage = Math.floor(Math.min((spentAmount / totalBudget) * 100, 100)); 
  return (
    <div className=" border border-transparent shadow-md mt-4 hover:border hover:border-gray-300 bg-white p-2 rounded-xl">
      <div className="flex justify-between mb-2">
        {
          data.type === 'debt' ? <p className="text-2xl flex gap-x-2 items-center font-medium text-gray-700">{data.type}:<span className='flex items-center gap-x-2'> {data.personName} <FaLongArrowAltRight/> you</span></p> : <p className="text-2xl flex gap-x-2 items-center font-medium text-gray-700">{data.type}:<span className='flex items-center gap-x-2'>you <FaLongArrowAltRight/> {data.personName} </span></p> 

        }
        <span className="text-sm font-medium text-gray-700">
            <p className={data.type==='credit'?'text-clr_accent_200':'text-red-500'}>{data.type}: ₹{totalBudget}</p>
        </span>
      </div>
      <div className="flex gap-x-1 items-center">
        <div className="w-12 text-3xl flex justify-center items-center h-12 rounded-full bg-red-400">
            <IoFastFood/>
        </div>
          <div className="w-full relative  bg-gray-200 rounded-full h-4">
            <div
              className="h-4 rounded-full relative"
              style={{
                width: `${percentage}%`,
                backgroundColor: percentage === 100 ? "red" : "green",
                transition: "width 0.3s ease-in-out",
              }}
            >
             <p className="absolute text-sm right-0 top-4 ">{`${percentage}%`}</p>
            </div>
            <div className='flex inset-0 -top-5 mx-4 justify-between absolute '>
                <p className='text-sm '>10 November</p>
                <p className='text-sm'>10 December</p>
                </div>
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
          <button onClick={onDel} className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdDelete/></button>
          <button onClick={onEdit} className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdEdit/></button>
          </span>
      </div>
    </div>
  );
}

export default DebtCard