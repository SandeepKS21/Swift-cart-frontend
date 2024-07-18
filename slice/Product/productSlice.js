import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsAsync, getProductByIdAsync } from "./ProductApi";

const initialState = {
  products: [],
  error: null,
  productLoading: "idle",
  productDetails: null,
};

export const getAllProducts = createAsyncThunk("getAllProduct", async () => {
  try {
    const response = await getAllProductsAsync();
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const getProductById = createAsyncThunk("getProductById", async (id) => {
  try {
    const response = await getProductByIdAsync(id);
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.productDetails = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.productLoading = "pending";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.error = null;
        state.productLoading = "idle";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productLoading = "idle";
        state.error = action.error.message;
      });

    builder
      .addCase(getProductById.pending, (state) => {
        state.productLoading = "pending";
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetails = action.payload.data;
        state.error = null;
        state.productLoading = "idle";
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.productLoading = "idle";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const getproduct = (state) => state.product.products;
export const productError = (state) => state.product.error;
export const productLoading = (state) => state.product.productLoading;
export const productDetail = (state) => state.product.productDetails;

export const { resetProduct } = productSlice.actions;

export default productSlice.reducer;
