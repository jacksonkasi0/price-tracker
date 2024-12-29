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
  const chartTheme = theme === "dark" ? "dark" : "light";

  const handleViewHistory = async (productId: number) => {
    const data: any = await fetchPriceHistory(productId);
    if (data.success) {
      setPriceHistory(data.history);
      setSelectedProduct(`Product ${productId}`);
    }
  };

  return (
    <div>
      <ProductsTable theme={chartTheme} onViewHistory={handleViewHistory} />
      {priceHistory.length > 0 && (
        <div className="mt-6">
          <PriceHistoryChart data={priceHistory} theme={chartTheme} />
        </div>
      )}
    </div>
  );
};

export default ProductsTableSection;
