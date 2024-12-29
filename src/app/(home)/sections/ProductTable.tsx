"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ColDef } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
} from "ag-grid-community";

// Import styles for light and dark themes
import "ag-grid-community/styles/ag-theme-alpine.css"; 


// Register necessary modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
]);

// Define types for Product and API response
interface Product {
  id: number;
  name: string;
  url: string;
  platform: string;
  min_price: number;
  max_price: number;
  current_price: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface ApiResponse {
  success: boolean;
  products: Product[];
  pagination: Pagination;
}

const ProductsTable: React.FC = () => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Fetch products with pagination
  const fetchProducts = async (currentPage: number) => {
    const limit = 10; // Rows per page
    try {
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${limit}`
      );
      const data: ApiResponse = await response.json();

      if (data.success) {
        setRowData(data.products);
        setTotalPages(Math.ceil(data.pagination.total / limit));
      } else {
        console.error("Error fetching products:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const columnDefs: ColDef[] = [
    { headerName: "ID", field: "id", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "Name", field: "name", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "URL", field: "url", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "Platform", field: "platform", sortable: true, filter: "agTextColumnFilter" },
    {
      headerName: "Min Price",
      field: "min_price",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Max Price",
      field: "max_price",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Current Price",
      field: "current_price",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
  ];

  return (
    <div>
      {/* Theme Toggle Button */}
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setIsDarkTheme((prev) => !prev)}
        >
          Toggle {isDarkTheme ? "Light" : "Dark"} Theme
        </button>
      </div>

      {/* AG Grid with dynamic theming */}
      <div
        className={`ag-theme-${isDarkTheme ? "alpine-dark" : "alpine"}`}
        style={{ height: 500, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
