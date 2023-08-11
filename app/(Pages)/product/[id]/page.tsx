import { Product } from "@/app/redux/products/types";
import axios from "axios";
import FullProduct from "./FullProduct";

async function fetchFullProduct(params: { id: string }) {
  "use server";

  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/6yro/db.json/products/${params.id}`
    );
    return data;
  } catch (error) {
    return undefined;
  }
}

export default async function FullProductWrapper({ params }: any) {
  const productData = await fetchFullProduct(params);

  return <FullProduct product={productData} />;
}
