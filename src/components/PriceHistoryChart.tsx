import React from "react";

import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

import { PriceHistory } from "@/api/products";

const PriceHistoryChart: React.FC<{
  data: PriceHistory[];
  theme?: "dark" | "light";
}> = ({ data, theme }) => {
  if (!data || data.length === 0) {
    console.warn("No data provided to the chart");
    return <p>No data available to display</p>;
  }

  // Format data correctly for the chart
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US"), // Format date as MM/DD/YYYY
    price: parseFloat(item.price), // Convert price to a number
  }));

  const options: AgChartOptions = {
    data: formattedData,
    theme: {
      baseTheme: theme === "dark" ? "ag-default-dark" : "ag-default",
    },
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "price",
        yName: "Price",
        marker: { enabled: true },
      },
    ],
    axes: [
      { type: "category", position: "bottom", title: { text: "Date" } },
      {
        type: "number",
        position: "left",
        title: { text: "Price (Dynamic Currency)" },
      },
    ],
    legend: { enabled: false },
    title: {
      text: "Price History",
    },
  };

  return <AgCharts options={options} />;
};

export default PriceHistoryChart;
