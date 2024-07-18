import axios from "axios";
import { readItem } from "../../utils/localStorage";

export const getAllProductsAsync = async () => {
  const url = "https://swift-cart-backend.onrender.com/v1/product";

  const response = await axios.get(url);

  return response.data;
};

export const getProductByIdAsync = async (id) => {
  const headers = {};
  const token = await readItem("token");
  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    if (cleanedToken) {
      headers.Authorization = `Bearer ${cleanedToken}`;
    }
  }
  const url = `https://swift-cart-backend.onrender.com/v1/product/${id}`;

  const response = await axios.get(url, { headers });

  return response.data;
};
