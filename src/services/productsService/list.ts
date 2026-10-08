import type { ProductsResponse } from '@/types/product';

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

const ENDPOINT = `${API_BASE}/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`;

export async function list(): Promise<ProductsResponse> {
  const response = await fetch(ENDPOINT);

  if (!response.ok) {
    throw new Error('Não foi possível carregar a lista de produtos.');
  }

  return response.json();
}
