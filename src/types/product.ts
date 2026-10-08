export interface ProductProps {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
}

export interface ProductsResponse {
  success: boolean;
  products: ProductProps[];
}
