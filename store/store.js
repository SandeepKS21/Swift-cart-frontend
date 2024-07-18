import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import categryReducer from "../slice/Category/categorySlice";
import productReducer from "../slice/Product/productSlice";
import cartReducer from "../slice/Cart/CartSlice";
import userReducer from "../slice/User/UserSlice";
import PaymentReducer from "../slice/Payment/PaymentSlice";
import OrderReducer from "../slice/Order/OrderSlice";
import SearchReducer from "../slice/Search/SearchSlice";

export const store = configureStore({
  reducer: {
    userAuth: authReducer,
    category: categryReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    payment: PaymentReducer,
    order: OrderReducer,
    search: SearchReducer,
  },
});
