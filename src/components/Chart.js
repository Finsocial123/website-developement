import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register the required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Common options for all charts
const commonOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = ['Dec 19', 'Dec 21', 'Dec 23', 'Dec 25', 'Dec 27', 'Dec 29', 'Dec 31', 'Jan 2', 'Jan 4'];

// MainChart Component
export function MainChart() {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 65000, 59000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line options={options} data={data} />

  ;
}

// VolumeChart Component
export function VolumeChart() {
  const data = {
    labels,
    datasets: [
      {
        data: [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 3300],
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  return <Bar options={commonOptions} data={data} />

}

// BTCEarningsChart Component
export function BTCEarningsChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [30, 40, 35, 50, 45, 35, 40],
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  return <Bar options={commonOptions} data={data} />;
}






