import React from "react";
import { Bar } from "react-chartjs-2";
import "./GraphDashBoard.css";

const GroupedColumnChart = ({ incomesValues, expensesValues }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay(); // Get the index of today (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  // Rearrange the daysOfWeek array to start from today
  const last7DaysOfWeek = [
    ...daysOfWeek.slice(todayIndex + 1),
    ...daysOfWeek.slice(0, todayIndex + 1),
  ];

  const data = {
    labels: last7DaysOfWeek,

    datasets: [
      {
        label: "incomes",
        backgroundColor: "rgba(101, 166, 29, 0.75)",
        borderColor: "rgba(101, 166, 29, 0.75)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        borderRadius: 10,
        data: incomesValues,
        borderSkipped: false,
      },
      {
        label: "expanenses",
        backgroundColor: "rgba(255, 7, 7, 0.65)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        borderRadius: 10,
        data: expensesValues,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      animateScale: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="graphDashboard">
      <Bar data={data} width="900px" height="380px" options={options} />
    </div>
  );
};

export default GroupedColumnChart;
