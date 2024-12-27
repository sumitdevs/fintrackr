import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { formatDate } from '../utils/dateFormater';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function TransactionCard({data, onEdit, onDel}) {
  return (
    <div className='flex select-none items-center justify-between border rounded-xl bg-white mb-2'>
      <div className='flex flex-col gap-y-1 p-2'>
         <div className='flex gap-x-2 items-center leading-snug'>
          <span className='w-10 h-10 text-3xl flex items-center justify-center text-white bg-red-300 rounded-xl'> 
            <IoFastFood/>
          </span>
          {
            data.type==='expense' && <p><span className='text-sm opacity-70'>Spent on</span><br /><span>{data.category}</span></p>
          }
          {
            data.type==='income' && <p><span className='text-sm opacity-70'>Recieved as</span><br /><span>{data.category}</span></p>
          }
         </div>
        <span className='text-sm'>{formatDate(data.date)}</span>
      </div>

      <div className='flex flex-col gap-y-1 leading-snug p-2'>
      <p className='text-2xl flex justify-end self-end'>&#8377; {data.amount}</p>
      {
        data.type==='income' && <p><span className='text-xs text-clr_accent_200'>Credited to, </span><span >{data.account}</span></p>
      }
      {
        data.type==='expense' && <p><span className='text-xs text-red-500'>Debited From, </span><span >{data.account}</span></p>
      }
       <span className="flex  justify-end gap-x-2">
          <button onClick={onDel} className='w-7 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdDelete/></button>
          <button onClick={onEdit} className='w-7 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdEdit/></button>
       </span>
      </div>
      
    </div>
  )
}

export default TransactionCard