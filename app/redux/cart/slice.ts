import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findSameProduct } from "../../utils/findSameProduct";
import {
  CartProduct,
  CartSliceState,
  ProductCalc,
  RemoveProduct,
} from "./types";

const initialState: CartSliceState = {
  cartProducts: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      state.totalPrice += action.payload.price;

      if (findSameProduct(state, action)) {
        findSameProduct(state, action)!.value += 1;
      } else state.cartProducts.push(action.payload);
    },
    clearCart() {
      return initialState;
    },
    plusProduct(state, action: PayloadAction<ProductCalc>) {
      findSameProduct(state, action)!.value += 1;
      state.totalPrice += findSameProduct(state, action)!.price;
    },
    minusProduct(state, action: PayloadAction<ProductCalc>) {
      findSameProduct(state, action)!.value -= 1;
      state.totalPrice -= findSameProduct(state, action)!.price;
    },
    removeProduct(state, action: PayloadAction<RemoveProduct>) {
      state.totalPrice -=
        findSameProduct(state, action)!.price *
        findSameProduct(state, action)!.value;
      state.cartProducts = state.cartProducts.filter((obj) => {
        if (obj.id !== action.payload.id) {
          return true;
        } else if (obj.color !== action.payload.color) {
          return true;
        } else if (obj.size !== action.payload.size) {
          return true;
        }
        return false;
      });
    },
  },
});

export const {
  addToCart,
  clearCart,
  plusProduct,
  minusProduct,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
