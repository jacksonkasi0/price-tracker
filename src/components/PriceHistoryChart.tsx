import React from "react";
import { AgCharts } from "ag-charts-react";

interface PriceHistory {
  date: string;
  price: number;
}

const PriceHistoryChart: React.FC<{
  data: PriceHistory[];
  theme?: "dark" | "light";
}> = ({ data, theme }) => {
  return (
    <AgCharts
      options={{
        data: data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          price: item.price,
        })),
        series: [
          {
            xKey: "date",
            yKey: "price",
            type: "line",
            stroke: theme === "dark" ? "#FFF" : "#000",
          },
        ],
        axes: [
          { type: "category", position: "bottom", title: { text: "Date" } },
          { type: "number", position: "left", title: { text: "Price" } },
        ],
        legend: { enabled: false },
      }}
    />
  );
};

export default PriceHistoryChart;
