import axios from "axios";
import HomePage from "./homePage";

const categoriesList = [
  "New Arrivals",
  "Final Stock",
  "Best Sellers",
  "Clothing",
  "Objects",
  "Face Masks",
];

const parse = require("parse-link-header");

async function fetchStartProducts() {
  "use server";

  const resp = await axios.get(
    `https://my-json-server.typicode.com/6yro/db.json/products?category=${categoriesList[0].toLowerCase()}&_page=1&_limit=3`
  );
  const paginationLinks = parse(`${resp.headers.link}`);

  return { paginationLinks, data: resp.data };
}

export default async function HomePageWrapper() {
  const startProducts = await fetchStartProducts();

  return (
    <HomePage startProducts={startProducts} categoriesList={categoriesList} />
  );
}
