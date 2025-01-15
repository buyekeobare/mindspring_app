import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const AnalyticsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch trends data from the backend
    fetch("/api/analytics/trends", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching analytics data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: data.map((entry) => entry.date), // Dates from the backend
    datasets: [
      {
        label: "Stress Levels Over Time",
        data: data.map((entry) => entry.stressLevel), // Stress levels
        fill: false,
        backgroundColor: "#476268",
        borderColor: "#40a798",
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h1>Stress Level Trends</h1>
      <Line data={chartData} />
    </div>
  );
};

export default AnalyticsPage;
