// RingChart.js

import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./RingChart.css";
const RingChart = ({ percentage, ringColor }) => {
  var completedColor = "";

  if (ringColor == "My Balance") {
    completedColor = `#561B54`;
  } else if (ringColor == "Incomes") {
    completedColor = `#65A61D`;
  } else if (ringColor == "Expenses") {
    completedColor = `#EA4F1B`;
  } else {
    completedColor = `#FFFFFF`;
  }
  const remainingColor = `#FFFFFF`;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [completedColor, remainingColor],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: 30,
    animation: {
      animateRotate: false,
      animateScale: true,
    },
    elements: {
      arc: {
        borderColor: "transparent",
      },
    },
    plugins: {
      legend: {
        position: "bottom", // Adjust the position as needed (top, bottom, left, right)
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="ring-chart-container">
      <Doughnut data={data} options={options} className="ring-chart" />
      <div className="ring-chart-text">
        <div className="ring-chart-text-percentage">{`${percentage}%`}</div>
        <div className="ring-chart-text-label">Completed</div>
      </div>
    </div>
  );
};

export default RingChart;
