import axios from "axios";
import { readItem } from "../../utils/localStorage";

export const getOrderListApi = async () => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    headers.Authorization = `Bearer ${cleanedToken}`;
  }

  const url = "https://swift-cart-backend.onrender.com/v1/users/order/list";

  const response = await axios.get(url, { headers });

  return response.data;
};

export const getOrderByIdApi = async (id) => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    headers.Authorization = `Bearer ${cleanedToken}`;
  }

  const url = `https://swift-cart-backend.onrender.com/v1/users/order/details/${id}`;

  const response = await axios.get(url, { headers });

  return response.data;
};
