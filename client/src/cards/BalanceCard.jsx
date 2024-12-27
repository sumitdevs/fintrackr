import React from 'react'

function BalanceCard() {
  return (
    <div className="px-4 py-4 bg-white col-span-2 rounded shadow border ">
         <p className='text-center text-clr_primary_300 text-6xl mb-3'>&#8377; 1000</p>
          <div className='flex flex-col gap-y-2 p-2 text-base font-semibold bg-clr_primary_300 bg-opacity-10'>
         
            <div className="flex justify-between  items-center">
                <p>Credit cards:</p>
                <p className='text-red-600'>- &#8377; 100</p>
            </div>
            <div className="flex justify-between  items-center">
                <p>Debts:</p>
                <p className='text-red-600'>- &#8377; 200</p>
            </div>
            <div className="flex justify-between items-center border-t-2 border-clr_primary_100">
                <p>Net Worth:</p>
                <p className='text-clr_accent_200 text-xl'>&#8377; 700</p>
            </div>
          </div>
    </div>
  )
}

export default BalanceCard