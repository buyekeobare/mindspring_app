import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
// Import necessary components from chart.js
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

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null); // Ref to manage the chart instance

  useEffect(() => {
    // Fetch trends data from the backend
    fetch("http://localhost:5000/api/analytics/trends", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching analytics data:", error));

    return () => {
      // Cleanup function: Destroy the chart instance if it exists
      const chartInstance = chartRef.current;
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: data.map((entry) => entry.date), // Map dates from the backend
    datasets: [
      {
        label: "Stress Levels Over Time",
        data: data.map((entry) => entry.stressLevel), // Map stress levels
        fill: false,
        backgroundColor: "fourth-color",
        borderColor: "third-color",
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h1>Stress Level Trends</h1>
      <Line ref={chartRef} data={chartData} />
    </div>
  );
};

export default AnalyticsPage;
