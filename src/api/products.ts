export interface Product {
  id: number;
  name: string;
  url: string;
  platform: string;
  min_price: number;
  max_price: number;
  current_price: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

export interface PriceHistory {
  id: number;
  product_id: number;
  price:  string;
  date: string;
}

export interface ApiResponse {
  success: boolean;
  products: Product[];
  pagination: Pagination;
}

export const fetchProducts = async (
  currentPage: number,
  limit: number
): Promise<ApiResponse> => {
  const response = await fetch(
    `/api/products?page=${currentPage}&limit=${limit}`
  );
  return response.json();
};

export const fetchPriceHistory = async (
  productId: number
): Promise<{ success: boolean; history: PriceHistory[] }> => {
  const response = await fetch(`/api/products/${productId}/history`);
  return response.json();
};
