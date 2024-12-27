import React from 'react';


const DeleteCard = ({account,type, onConfirm, onCancel}) => {
  
  return (
    <div id='deletecard' className='fixed inset-0  z-20 bg-gray-500 bg-opacity-10 '>
        <div className='mx-auto flex mt-20 flex-col gap-y-10 rounded-lg max-w-lg bg-white p-4'>
            <div className='flex flex-col gap-y-2'>
                <h2 className='text-3xl uppercase '>delete {type}</h2>
                <p className='text-sm'>Are you sure you want to delete "{account.accountName || account.name || account.category || account.type}"?</p>
            </div>
            <div className='flex justify-end gap-x-2'>
                <button onClick={onCancel} className='px-6 text-white hover:bg-opacity-90 bg-blue-500 py-1'>cancel</button>
                <button onClick={onConfirm} className='px-6 text-white hover:bg-opacity-90 bg-red-500 py-1'>delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteCard;