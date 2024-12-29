"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";

import ProductsTable from "@/components/ProductsTable";
import PriceHistoryChart from "@/components/PriceHistoryChart";

import { fetchPriceHistory, PriceHistory } from "@/api/products";

const ProductsTableSection: React.FC = () => {
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  const handleViewHistory = async (productId: number) => {
    try {
      const data = await fetchPriceHistory(productId);
      if (data.success) {
        setPriceHistory(data.history);
        setSelectedProduct(`Product ${productId}`);
      }
    } catch (error) {
      console.error("Failed to fetch price history:", error);
    }
  };

  return (
    <div>
      <ProductsTable theme={currentTheme} onViewHistory={handleViewHistory} />
      {priceHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-primary">
            Price History for {selectedProduct}
          </h2>
          <PriceHistoryChart data={priceHistory} theme={currentTheme} />
        </div>
      )}
    </div>
  );
};

export default ProductsTableSection;
