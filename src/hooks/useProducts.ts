import { useEffect, useState } from 'react';

import productsService from '@/services/productsService';
import type { ProductProps } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsService
      .list()
      .then((response) => {
        setProducts(response.products);
        setError(null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
      })
      .finally(() => {
        setIsFirstLoading(false);
      });
  }, []);

  const isEmpty = !isFirstLoading && products.length === 0;

  return {
    products,
    isFirstLoading,
    isEmpty,
    error,
  };
}
