import { readItem } from "../../utils/localStorage";
import axios from "axios";

export const getUserDetailsApi = async () => {

  const headers = {};
  const token = await readItem("token");
  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;
  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/users`;

  const response = await axios.get(url, { headers });
  return response.data;
};

export const getUserAddressByIdApi = async (id) => {
  const headers = {};
  const token = await readItem("token");
  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;
  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/users/address/${id}`;

  const response = await axios.get(url, { headers });

  return response.data;
};

export const updateUserAddressByIdIdApi = async (id, body) => {
  const headers = {};
  const token = await readItem("token");
  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;
  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/users/address/${id}`;

  const response = await axios.patch(url, body, { headers });

  return response.data;
};

export const addNewAddressApi = async (body) => {
  const headers = {};
  const token = await readItem("token");
  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;
  headers.Authorization = `Bearer ${cleanedToken}`;

  const url = `https://swift-cart-backend.onrender.com/v1/users/address`;

  const response = await axios.patch(url, body, { headers });

  return response.data;
};
