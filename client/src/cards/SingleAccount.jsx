import React from 'react';
import ToggleButton from '../components/ToggleButton'
import { MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


function SingleAccount({data, onDel, onEdit}) {

  const deleteCard = ()=>{
    const form = document.getElementById('deletecard');
    form.classList.toggle('hidden');
  }
  
  return (
    <div className='w-full p-2 mb-1 bg-white border rounded-sm flex justify-between'>
        <div className='flex flex-col gap-y-2'>
            <p>{data.accountName}</p>
            <ToggleButton/>
        </div>
        <div>
            <p className='text-xl  flex justify-end'>&#8377; {data.balance}</p>
            <div className='flex text-xl items-center justify-end gap-x-2 mt-2 '>
                <button className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><IoEye/></button>
                <button onClick={onDel} className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdDelete/></button>
                <button onClick={onEdit}  className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdEdit/></button>
            </div>
        </div>
    </div>
  )
}

export default SingleAccount