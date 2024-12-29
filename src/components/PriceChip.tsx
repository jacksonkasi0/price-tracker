import React from "react";

interface PriceChipProps {
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  theme?: "dark" | "light";
}

const PriceChip: React.FC<PriceChipProps> = ({
  currentPrice,
  minPrice,
  maxPrice,
  theme = "light",
}) => {
  const getChipStyle = () => {
    if (currentPrice < minPrice) {
      return theme === "dark" ? "bg-green-700 text-white" : "bg-green-500 text-white";
    }
    if (currentPrice >= minPrice && currentPrice <= maxPrice) {
      return theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-500 text-white";
    }
    if (currentPrice > maxPrice) {
      return theme === "dark" ? "bg-red-700 text-white" : "bg-red-500 text-white";
    }
    if (currentPrice >= maxPrice * 0.9) {
      return theme === "dark" ? "bg-yellow-700 text-black" : "bg-yellow-500 text-black";
    }
    return theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-500 text-white";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getChipStyle()}`}>
      {currentPrice}
    </span>
  );
};

export default PriceChip;
