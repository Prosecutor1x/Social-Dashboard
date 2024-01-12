import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const whiteTextColor = "#ffffff"; // White text color for labels

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: whiteTextColor,
      },
    },
    title: {
      display: true,
      text: "Gender",
      color: whiteTextColor,
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: whiteTextColor,
      },
    },
    title: {
      display: true,
      text: "Age",
      color: whiteTextColor,
    },
  },
};
export const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: whiteTextColor,
      },
    },
    title: {
      display: true,
      text: "Location",
      color: whiteTextColor,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const data3 = {
  labels,

  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function GenderPieChart() {
  return (
    <>
      <div>
        <Pie data={data} options={options} />
      </div>
      <div>
        <Bar data={data2} options={options2} />
        <Bar data={data3} options={options3} />
      </div>
    </>
  );
}
