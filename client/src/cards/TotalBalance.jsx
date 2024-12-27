import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalBalance = ({data}) => {
  const chartData = {
    labels: data.map((item) => item.accountName), // Account names for the labels
    datasets: [
      {
        label: "Account Balances",
        data: data.map((item) => item.balance), // Balances for the data
        backgroundColor: [
          "#2563eb", // Tailwind Blue-600
          "#10b981", // Tailwind Green-500
          "#f59e0b", // Tailwind Amber-500
          "#ef4444", // Tailwind Red-500
          "#6b7280", // Tailwind Gray-500
        ],
        hoverBackgroundColor: [
          "#1d4ed8",
          "#059669",
          "#d97706",
          "#dc2626",
          "#4b5563",
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#4B5563", // Tailwind Gray-600
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const balance = tooltipItem.raw;
            return `Balance: ${balance.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
   <Pie data={chartData} options={options} width={300} />
  );
};

export default TotalBalance;
