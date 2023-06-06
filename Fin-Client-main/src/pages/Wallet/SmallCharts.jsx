import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./sm.css";
import axios from "axios";

const SmallCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [labels, setlabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/charts/createchart"
        );
        const { creditsEarned, creditsUsed, labels } = response.data;
        setChartData([
          {
            name: "Credits Earned",
            data: creditsEarned,
          },
          {
            name: "Credits Used",
            data: creditsUsed,
          },
        ]);
        console.log("Data labels are", labels);
        setlabels([{}]);
        console.log("Cahrt labels are ", chartData.labels);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);
  const options = {
    chart: {
      id: "line-chart",
    },
    xaxis: {
      categories: chartData.labels,
      // Will be populated dynamically with received labels
    },
    yaxis: {
      title: {
        text: "Your Credits",
      },
    },
  };
  return (
    <div className="Chart">
      <Chart type="line" series={chartData} options={options}></Chart>
    </div>
  );
};

export default SmallCharts;
