import axios from "axios";
import { readItem } from "../../utils/localStorage";

export const addToCartApi = async (product, quantity, token) => {
  const url = "https://swift-cart-backend.onrender.com/v1/cart";

  const cartBody = {
    product: product,
    quantity: quantity,
  };

  const cleanedToken = token.replace(/^"(.*)"$/, "$1"); // Remove surrounding double quotes

  const response = await axios.post(url, cartBody, {
    headers: {
      Authorization: `Bearer ${cleanedToken}`,
    },
  });

  return response.data;
};

export const getCartItemApi = async () => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    headers.Authorization = `Bearer ${cleanedToken}`;
  }

  const url = "https://swift-cart-backend.onrender.com/v1/cart";

  const response = await axios.get(url, { headers });

  return response.data;
};

export const removeCartItemApi = async (id) => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/cart/${id}`;

  const response = await axios.delete(url, { headers });

  return response.data;
};

export const updateCartQuantityApi = async (cartId, quantity) => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/cart/${cartId}`;

  const response = await axios.patch(url, { quantity: quantity }, { headers });

  return response.data;
};
