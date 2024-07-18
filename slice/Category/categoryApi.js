import axios from "axios";

export const getAllCategoryAsync = async () => {
  const url = "https://swift-cart-backend.onrender.com/v1/category";


  const response = await axios.get(url);



  return response.data;
};
