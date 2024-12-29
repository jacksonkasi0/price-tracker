"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";

import ProductsTable from "@/components/ProductsTable";
import PriceHistoryChart from "@/components/PriceHistoryChart";

import { fetchPriceHistory } from "@/api/products";

interface PriceHistory {
  id: number;
  product_id: number;
  price: number;
  date: string;
}

const ProductsTableSection: React.FC = () => {
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  const handleViewHistory = async (productId: number) => {
    const data = await fetchPriceHistory(productId);
    if (data.success) {
      setPriceHistory(data.history);
      setSelectedProduct(`Product ${productId}`);
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
