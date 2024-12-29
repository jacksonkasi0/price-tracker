/* eslint-disable  @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
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

import "ag-grid-community/styles/ag-theme-alpine.css";

import PriceChip from "@/components/PriceChip";
import { darkThemeConfig, lightThemeConfig } from "@/config/ag-grid";
import { ApiResponse, fetchProducts, Product } from "@/api/products";

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
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);

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
      cellRenderer: (params: { value: string }) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {params.value}
        </a>
      ),
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

  const fetchAndSetProducts = useCallback(
    async (currentPage: number, currentPageSize: number) => {
      try {
        const data: ApiResponse = await fetchProducts(currentPage, currentPageSize);
        if (data.success) {
          setRowData(data.products);
          setTotalRows(data.pagination.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchAndSetProducts(page, pageSize);
  }, [page, pageSize, fetchAndSetProducts]);

  const handlePaginationChanged = (event: any) => {
    const newPage = event.api.paginationGetCurrentPage() + 1;
    const newPageSize = event.api.paginationGetPageSize();

    if (newPage !== page) {
      setPage(newPage);
    }

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  };

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
        paginationAutoPageSize={false}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        onPaginationChanged={handlePaginationChanged}
      />
    </div>
  );
};

export default ProductsTable;
