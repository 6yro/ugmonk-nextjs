export type Product = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: number;
  category: string;
  colors: Array<string>;
  sizes: ProductSize[];
};

export type ProductSize = {
  size: string;
  inStock: boolean;
  price: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  NEVER = "never",
}

export interface ProductsSliceState {
  products: Product[];
  paginationLinks: any;
  status: Status;
}

export type fetchProductsParams = {
  currentCategory: string;
  _page: number;
};
