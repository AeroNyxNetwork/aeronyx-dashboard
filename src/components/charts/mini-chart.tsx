'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

interface MiniChartProps {
  data: number[];
  status: 'positive' | 'negative' | 'neutral';
}

export function MiniChart({ data, status }: MiniChartProps) {
  // Define colors based on status
  const getColor = () => {
    switch (status) {
      case 'positive':
        return { border: '#00c48c', background: 'rgba(0, 196, 140, 0.1)' };
      case 'negative':
        return { border: '#ff5c5c', background: 'rgba(255, 92, 92, 0.1)' };
      default:
        return { border: '#9747ff', background: 'rgba(151, 71, 255, 0.1)' };
    }
  };

  const { border, background } = getColor();

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
  };

  // Chart data
  const chartData = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data: data,
        borderColor: border,
        backgroundColor: background,
        fill: true,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
