import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../services/api';
import { Product, ProductsResponse } from '../types';
interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async (pageNumber: number, reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productsApi.getProducts(pageNumber);
      const data: ProductsResponse = response.data;

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      setHasMore(data.hasMore);
      setPage(pageNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(page + 1);
    }
  }, [loading, hasMore, page, loadProducts]);

  const refresh = useCallback(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    loadProducts(1, true);
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(1, true);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
