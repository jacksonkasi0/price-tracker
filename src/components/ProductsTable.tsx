"use client";

import React, { useEffect, useState } from "react";

// ** import third-party libraries
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

// ** import styles for light and dark themes
import "ag-grid-community/styles/ag-theme-alpine.css";

// ** import config
import { darkThemeConfig, lightThemeConfig } from "@/config/ag-grid";

// ** import API functions 
import { ApiResponse, fetchProducts, Product } from "@/api/products";

import PriceChip from "@/components/PriceChip";


// Register necessary modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
]);

const ProductsTable: React.FC<{
  theme: "dark" | "light";
  onViewHistory: (productId: number) => void;
}> = ({ theme, onViewHistory }) => {
  const [rowData, setRowData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);

  const limit = 10;

  const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 100,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 250,
    },
    {
      headerName: "URL",
      field: "url",
      cellRenderer: (params: { value: string }) => {
        return (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {params.value}
          </a>
        );
      },
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
      cellRenderer: (params: {
        value: number;
        data: { min_price: number; max_price: number };
      }) => (
        <PriceChip
          currentPrice={params.value}
          minPrice={params.data.min_price}
          maxPrice={params.data.max_price}
          theme={theme}
        />
      ),
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "History",
      field: "id",
      cellRenderer: (params: { value: number }) => (
        <button
          onClick={() => onViewHistory(params.value)}
          className="text-primary hover:underline"
        >
          View History
        </button>
      ),
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      const data: ApiResponse = await fetchProducts(page, limit);
      if (data.success) {
        setRowData(data.products);
      }
    };
    loadProducts();
  }, [page]);

  {
    /* AG Grid with dynamic theming based on system preference */
  }
  const myTheme = themeQuartz.withParams({
    ...(theme === "dark" ? darkThemeConfig : lightThemeConfig),
    headerFontSize: 14,
  });

  return (
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        theme={myTheme}
        paginationPageSize={limit}
        paginationPageSizeSelector={[limit, limit * 2, limit * 3]}
        onPaginationChanged={(event) =>
          setPage(event.api.paginationGetCurrentPage() + 1)
        }
      />
    </div>
  );
};

export default ProductsTable;
