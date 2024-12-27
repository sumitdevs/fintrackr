import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyBalance = () => {
    const data = [
        { date: "sep-1", balance: 2000 },
        { date: "sep-2", balance: 2500 },
        { date: "sep-3", balance: 2200 },
        { date: "sep-4", balance: 2800 },
        { date: "sep-6", balance: 3000 },
      ];
  const chartData = {
    labels: data.map((item) => item.date), // Extract dates for the x-axis
    datasets: [
      {
        label: "Balance",
        data: data.map((item) => item.balance), // Extract balances for the y-axis
        borderColor: "#2563eb", // Tailwind Blue-600
        backgroundColor: "rgba(37, 99, 235, 0.3)", // Transparent Tailwind Blue
        fill: true,
        tension: 0.4, // Curved line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000", // Text color for the legend
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563", // Tailwind Gray-600
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#4B5563", // Tailwind Gray-600
        },
        grid: {
          color: "#E5E7EB", // Tailwind Gray-200
        },
      },
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Balance Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DailyBalance;
