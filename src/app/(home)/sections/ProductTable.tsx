"use client";

import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ColDef,
  themeQuartz,
  PaginationModule,
} from "ag-grid-community";
import {
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
} from "ag-grid-community";

import { useTheme } from "next-themes";

// Import styles for light and dark themes
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register necessary modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
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
  const { theme } = useTheme();
  const limit = 10;

  // Fetch products with pagination
  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${limit}`
      );
      const data: ApiResponse = await response.json();

      if (data.success) {
        setRowData(data.products);
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
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "URL",
      field: "url",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Platform",
      field: "platform",
      sortable: true,
      filter: "agTextColumnFilter",
    },
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

  const darkThemeConfig = {
    backgroundColor: "#1f2836",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor",
    },
    foregroundColor: "#FFF",
  };

  const lightThemeConfig = {
    backgroundColor: "#FFF",
    browserColorScheme: "light",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor",
    },
    foregroundColor: "#000",
  };

  {
    /* AG Grid with dynamic theming based on system preference */
  }
  const myTheme = themeQuartz.withParams({
    ...(theme === "dark" ? darkThemeConfig : lightThemeConfig),
    headerFontSize: 14,
  });

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          theme={myTheme}
          paginationPageSize={limit}
          onPaginationChanged={(event) =>
            setPage(event.api.paginationGetCurrentPage() + 1)
          }
        />
      </div>
    </div>
  );
};

export default ProductsTable;
