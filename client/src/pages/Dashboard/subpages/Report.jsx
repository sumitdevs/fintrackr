import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Savings', 'Investments', 'Expenses', 'Emergency Fund'],
    datasets: [
      {
        label: 'Account Distribution',
        data: [35, 25, 30, 10], // Replace these values with your data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += `${context.raw}%`; // Shows the percentage value
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <Pie data={data} options={options} />
    </div>
  );
};

export default Report;
