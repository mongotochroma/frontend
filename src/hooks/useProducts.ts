import { useEffect, useState, useCallback } from "react";
import type { Product } from "../types/productType";
import { fetchProducts } from "../services/getdataservies";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data ?? []); // ensure it's always an array
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load products";
      setError(message);
      console.error("Error loading products:", err);
      setProducts([]); // optional: reset on error
    } finally {
      setLoading(false);
    }
  }, []); // empty deps since fetchProducts is stable

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]); // safe because loadProducts is memoized

  return {
    products,
    loading,
    error,
    refetch: loadProducts,
  };
}
