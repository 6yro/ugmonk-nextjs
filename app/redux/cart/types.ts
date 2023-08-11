export type CartProduct = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: number;
  color: string;
  size: string;
  price: number;
  value: number;
};

export interface CartSliceState {
  cartProducts: CartProduct[];
  totalPrice: number;
}

export type ProductCalc = {
  id: string;
  color: string;
  size: string;
  value?: number;
};

export type RemoveProduct = {
  id: string;
  color: string;
  size: string;
};
