import axios from "axios";

export const authSendOtpApi = async (userBody) => {
  const url = "https://swift-cart-backend.onrender.com/v1/auth/send-otp";

  const response = await axios.post(url, userBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const authVerifyOtpApi = async (userBody) => {
  const url = "https://swift-cart-backend.onrender.com/v1/auth/verify-otp";

  const response =  await axios.post(url, userBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
