import axios from "axios";
import { readItem } from "../../utils/localStorage";

export const searchProductApi = async (searchBody) => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    headers.Authorization = `Bearer ${cleanedToken}`;
  }

  const url = "https://swift-cart-backend.onrender.com/v1/product/search";

  const response = await axios.post(url, searchBody, { headers });

  return response.data;
};
