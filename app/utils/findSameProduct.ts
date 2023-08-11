import { CartProduct, CartSliceState, ProductCalc } from "../redux/cart/types";

export const findSameProduct = (
  state: CartSliceState,
  action: { payload: ProductCalc }
) =>
  state.cartProducts.find(
    (obj: CartProduct) =>
      obj.id === action.payload.id &&
      obj.color === action.payload.color &&
      obj.size === action.payload.size
  );
