import React from 'react';
import { Pie } from 'react-chartjs-2';

const TransCard = () => {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [7000, 3000], // Income: 7000, Expense: 3000
        backgroundColor: ['#4CAF50', '#F44336'], // Green for Income, Red for Expense
        hoverBackgroundColor: ['#66BB6A', '#E57373'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className='col-span-2 flex justify-between items-center bg-white'>
        <div className='flex-1'>
          <Pie className='w-[10%]' data={data} options={options} />
        </div>
        <div className='flex-1 items-center gap-y-2 flex flex-col'>
                    <span className='text-xl border-b'>
                        <p className='ml-3.5'>&#8377; 7000</p>
                        <p className='text-red-500'>- &#8377; 3000</p>
                    </span>
                    <p className='text-clr_accent_200 text-xl ml-3.5'>&#8377; 4000</p>
                </div>
        </div>
  );
};

export default TransCard;
