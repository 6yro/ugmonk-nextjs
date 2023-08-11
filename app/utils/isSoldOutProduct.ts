import { ProductSize } from "../redux/products/types";

export const isSoldOutProduct = (sizes: ProductSize[]) => {
  let inStockCount = sizes.length;

  sizes.forEach((obj) => {
    if (obj.inStock === false) {
      inStockCount -= 1;
    }
  });

  if (inStockCount === 0) {
    return true;
  } else return false;
};
