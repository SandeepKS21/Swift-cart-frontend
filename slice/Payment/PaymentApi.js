import axios from "axios";
import { readItem } from "../../utils/localStorage";

export const getPaymentLinkApi = async (paymentBody) => {
  const token = await readItem("token");
  const headers = {};

  const cleanedToken = token ? token.replace(/^"(.*)"$/, "$1") : null;

  if (cleanedToken) {
    headers.Authorization = `Bearer ${cleanedToken}`;
  }

  const url =
    "https://swift-cart-backend.onrender.com/v1/users/payment/generate-link";

  const response = await axios.post(url, paymentBody, { headers });

  return response.data;
};
