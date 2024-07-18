import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  getCartItemApi,
  removeCartItemApi,
  updateCartQuantityApi,
} from "./CartApi";
import { logout } from "../authSlice";
import { removeItem } from "../../utils/localStorage";
import { getProductById } from "../Product/productSlice";

const initialState = {
  cart: [],
  error: null,
  sucessMsg: null,
  cartProductCount: 0,
  cartSubTotal: 0,

  loading: {
    cart: false,
    removeItem: false,
    addItem: false,
    getItem: false,
    updateItem: false,
  },
};

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ product, quantity, token }) => {
    try {
      const response = await addToCartApi(product, quantity, token);
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        // removeItem("token");
      }
      throw error.response.data.message;
    }
  }
);

export const getCartItem = createAsyncThunk("getCartItem", async () => {
  try {
    const response = await getCartItemApi();
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const removeCartItem = createAsyncThunk("removeCartItem", async (id) => {
  try {
    const response = await removeCartItemApi(id);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const removeAndUpdateCart = createAsyncThunk(
  "cart/removeAndUpdateCart",
  async (id, { dispatch }) => {
    try {
      const response = await dispatch(removeCartItem(id));
      await dispatch(getCartItem());

      return response.payload;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const addToCartAndGetCartItem = createAsyncThunk(
  "cart/addToCartAndGetCartItem",
  async ({ product, quantity, token }, { dispatch }) => {
    try {
      const response = await dispatch(addToCart({ product, quantity, token }));
      await dispatch(getProductById(product));

      return response.payload;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartId, productQuantity }, { dispatch }) => {
    try {
      const response = await updateCartQuantityApi(cartId, productQuantity);

      await dispatch(getCartItem());

      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartMsg: (state) => {
      state.sucessMsg = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAndGetCartItem.pending, (state) => {
        state.loading.addItem = true;
        state.sucessMsg = null;
        state.error = null;
      })
      .addCase(addToCartAndGetCartItem.fulfilled, (state, action) => {
        state.loading.addItem = false;
        state.sucessMsg = action.payload.message;
        state.error = null;
      })
      .addCase(addToCartAndGetCartItem.rejected, (state, action) => {
        state.loading.addItem = false;
        state.sucessMsg = null;
        state.error = action.error.message;
      });

    builder
      .addCase(getCartItem.pending, (state) => {
        state.loading.getItem = true;
        state.sucessMsg = null;
        state.error = null;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.loading.getItem = false;
        state.cart = action.payload.data.cartItem;
        state.error = null;
        state.cartProductCount = action.payload.data.cartCount;
        state.cartSubTotal = action.payload.data.subTotal;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.loading.getItem = false;
        state.sucessMsg = null;
        state.error = action.error.message;
      });

    builder
      .addCase(removeAndUpdateCart.pending, (state) => {
        state.loading.removeItem = true;
        state.error = null;
      })
      .addCase(removeAndUpdateCart.fulfilled, (state, action) => {
        state.loading.removeItem = false;

        state.error = null;
      })
      .addCase(removeAndUpdateCart.rejected, (state, action) => {
        state.loading.removeItem = true;

        state.loading.removeItem = false;

        state.error = action.error.message;
      });

    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading.updateItem = true;

        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading.updateItem = false;
        state.error = null;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading.updateItem = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const cartData = (state) => state.cart.cart;
export const cartErrror = (state) => state.cart.error;
export const cartSucessMsg = (state) => state.cart.sucessMsg;
export const cartProductCount = (state) => state.cart.cartProductCount;
export const cartSubTotal = (state) => state.cart.cartSubTotal;
export const cartLoading = (state) => state.cart.loading;
// export const c

export const { resetCartMsg } = cartSlice.actions;

export default cartSlice.reducer;
